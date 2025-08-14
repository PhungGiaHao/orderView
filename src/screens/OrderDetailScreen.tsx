import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useOrders } from "@/contexts/OrderContext";
import { useUI } from "@/contexts/UIContext";
import { ProductLine } from "@/types/Order";
import IconSvg from "../components/ui/IconSvg";

const OrderDetailScreen: React.FC = () => {
  const {
    selectedOrder,
    isLoading,
    error,
    fetchAllOrders,
    clearSelectedOrder,
  } = useOrders();
  const { setActiveScreen } = useUI();

  const handleBack = () => {
    clearSelectedOrder();
    setActiveScreen("orders");
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#1976d2" />
        <Text style={styles.loadingText}>Loading order details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.button} onPress={fetchAllOrders}>
          <Text style={styles.buttonText}>Back to Orders</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!selectedOrder) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No order selected</Text>
        <TouchableOpacity style={styles.button} onPress={handleBack}>
          <Text style={styles.buttonText}>Back to Orders</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <IconSvg
            name="chevron-right"
            size={18}
            color="#fff"
            style={{ transform: [{ rotate: "180deg" }] }}
          />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Order #{selectedOrder.id}</Text>
          <View
            style={[
              styles.statusChip,
              selectedOrder.status === "delivered"
                ? styles.delivered
                : selectedOrder.status === "shipped"
                ? styles.shipped
                : selectedOrder.status === "cancelled"
                ? styles.cancelled
                : styles.pending,
            ]}
          >
            {selectedOrder.status === "delivered" && (
              <IconSvg
                name="check-circle"
                size={16}
                color="#fff"
                style={styles.statusIcon}
              />
            )}
            {selectedOrder.status === "shipped" && (
              <IconSvg
                name="shipping"
                size={16}
                color="#fff"
                style={styles.statusIcon}
              />
            )}
            {selectedOrder.status === "cancelled" && (
              <IconSvg
                name="cancel"
                size={16}
                color="#fff"
                style={styles.statusIcon}
              />
            )}
            {!["delivered", "shipped", "cancelled"].includes(
              selectedOrder.status
            ) && (
              <IconSvg
                name="calendar"
                size={16}
                color="#fff"
                style={styles.statusIcon}
              />
            )}
            <Text style={styles.statusText}>
              {selectedOrder.status.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.customerInfo}>
        <Image source={{ uri: selectedOrder.avatar }} style={styles.avatar} />
        <View>
          <Text style={styles.customerName}>{selectedOrder.customer_name}</Text>
          <Text style={styles.customerDetail}>
            Customer ID: {selectedOrder.customer_id}
          </Text>
          <Text style={styles.customerDetail}>
            Order Date: {selectedOrder.order_date}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Items</Text>
        {selectedOrder.lines.map((line: ProductLine) => (
          <View key={line.product_id} style={styles.orderItem}>
            <Image source={{ uri: line.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>
                Product Id: {line.product_id}
              </Text>
              <Text style={styles.productName}>{line.product_name}</Text>
              <View style={styles.productDetail}>
                <IconSvg
                  name="basket"
                  size={14}
                  color="#666"
                  style={{ marginRight: 4 }}
                />
                <Text>Quantity: {line.quantity}</Text>
              </View>
              <View style={styles.productDetail}>
                <IconSvg
                  name="money"
                  size={14}
                  color="#666"
                  style={{ marginRight: 4 }}
                />
                <Text>Price: ${line.unit_price.toFixed(2)}</Text>
              </View>
              <Text style={styles.productTotal}>
                Subtotal: ${(line.quantity * line.unit_price).toFixed(2)}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.totalSection}>
        <View style={styles.totalRow}>
          <IconSvg name="receipt" size={20} color="#2563eb" />
          <Text style={styles.totalText}>
            Order Total: ${selectedOrder.total_amount.toFixed(2)}
          </Text>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <IconSvg name="print" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Print</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.shareButton]}>
            <IconSvg name="share" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ height: 120 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  header: {
    marginBottom: 20,
  },
  backButton: {
    marginBottom: 12,
  },
  backButtonText: {
    color: "#1976d2",
    fontSize: 16,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  statusChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  pending: {
    backgroundColor: "#FFC107",
  },
  shipped: {
    backgroundColor: "#2196F3",
  },
  delivered: {
    backgroundColor: "#4CAF50",
  },
  cancelled: {
    backgroundColor: "#F44336",
  },
  statusIcon: {
    marginRight: 4,
  },
  statusText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  customerInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  customerName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  customerDetail: {
    color: "#666",
    marginBottom: 2,
  },
  section: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    paddingVertical: 12,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 16,
    resizeMode: "contain",
  },
  productInfo: {
    flex: 1,
    justifyContent: "center",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  productDetail: {
    flexDirection: "row",
    alignItems: "center",
    color: "#666",
    marginBottom: 2,
  },
  productTotal: {
    fontWeight: "bold",
    marginTop: 4,
  },
  totalSection: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  totalRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 16,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2563eb",
    marginLeft: 8,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 8,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2563eb",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  shareButton: {
    backgroundColor: "#f59e0b",
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 6,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  errorText: {
    color: "#F44336",
    marginBottom: 16,
    textAlign: "center",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#1976d2",
    padding: 10,
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default OrderDetailScreen;
