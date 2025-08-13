import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useUI } from "@/contexts/UIContext";
import { useOrders } from "@/contexts/OrderContext";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import IconSvg from "./ui/IconSvg";
import { OrderStatus } from "@/types/Order";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { toggleDrawer } = useUI();
  const {
    filters,
    setSearchFilters,
    applyFilters,
    filterOrders,
    resetFilters,
  } = useOrders();
  const { isDesktop, isTablet, isMobile, isSmallMobile, isLargeMobile } = useResponsiveLayout();
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleCustomerIdSearch = (text: string) => {
    setSearchFilters({
      ...filters,
      customerId: text,
    });

    // Use filterOrders for immediate filtering as user types
    filterOrders(text);
  };

  const handleStatusChange = (status: OrderStatus) => {
    setSearchFilters({
      ...filters,
      status,
    });
    setShowFilterModal(false);
    applyFilters();
  };

  const clearFilters = () => {
    resetFilters();
    setShowFilterModal(false);
  };

  const clearSearch = () => {
    setSearchFilters({
      ...filters,
      customerId: "",
    });
    // Use filterOrders to ensure proper handling of empty search
    filterOrders("");
  };

  const handleSubmitSearch = () => {
    applyFilters();
  };

  return (
    <View style={[
      styles.container, 
      isSmallMobile && styles.smallMobileContainer,
      isLargeMobile && styles.largeMobileContainer
    ]}>
      <View style={[
        styles.leftSection, 
        isMobile && styles.mobileLeftSection,
        isSmallMobile && styles.smallMobileLeftSection,
        isLargeMobile && styles.largeMobileLeftSection
      ]}>
        {!isDesktop && (
          <TouchableOpacity onPress={toggleDrawer} style={[
            styles.menuButton,
            isSmallMobile && styles.smallMobileMenuButton
          ]}>
            <IconSvg name="menu" size={isSmallMobile ? 20 : 24} color="#333" />
          </TouchableOpacity>
        )}
        <Text
          style={[
            styles.title, 
            isMobile && styles.mobileTitle,
            isSmallMobile && styles.smallMobileTitle,
            isLargeMobile && styles.largeMobileTitle
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>

      {/* For very small mobile: Simplified search only */}
      {isSmallMobile ? (
        <View style={styles.smallMobileSearchSection}>
          <View style={styles.smallMobileSearchContainer}>
            <IconSvg name="search" size={14} color="#666" style={styles.searchIcon} />
            <TextInput
              style={styles.smallMobileSearchInput}
              placeholder="Search..."
              placeholderTextColor="#999"
              value={filters.customerId}
              onChangeText={handleCustomerIdSearch}
              onSubmitEditing={handleSubmitSearch}
            />
            {filters.customerId ? (
              <TouchableOpacity 
                style={styles.smallMobileClearButton} 
                onPress={clearSearch}
              >
                <IconSvg name="close" size={14} color="#999" />
              </TouchableOpacity>
            ) : null}
          </View>
          
          <TouchableOpacity 
            style={[styles.smallMobileFilterButton, filters.status ? styles.activeFilterButton : null]} 
            onPress={() => setShowFilterModal(!showFilterModal)}
          >
            <IconSvg name="settings" size={16} color={filters.status ? "#fff" : "#666"} />
          </TouchableOpacity>
          
          {/* Status Filter Modal for small mobile */}
          {showFilterModal && (
            <View style={[styles.filterModal, styles.smallMobileFilterModal]}>
              <Text style={styles.filterModalTitle}>Filter</Text>
              <TouchableOpacity 
                style={[styles.filterItem, filters.status === 'pending' && styles.activeFilterItem]}
                onPress={() => handleStatusChange('pending')}
              >
                <Text style={styles.filterItemText}>Pending</Text>
                {filters.status === 'pending' && <IconSvg name="check-circle" size={16} color="#2563eb" />}
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.filterItem, filters.status === 'shipped' && styles.activeFilterItem]}
                onPress={() => handleStatusChange('shipped')}
              >
                <Text style={styles.filterItemText}>Shipped</Text>
                {filters.status === 'shipped' && <IconSvg name="check-circle" size={16} color="#2563eb" />}
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.filterItem, filters.status === 'delivered' && styles.activeFilterItem]}
                onPress={() => handleStatusChange('delivered')}
              >
                <Text style={styles.filterItemText}>Delivered</Text>
                {filters.status === 'delivered' && <IconSvg name="check-circle" size={16} color="#2563eb" />}
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.filterItem, filters.status === 'cancelled' && styles.activeFilterItem]}
                onPress={() => handleStatusChange('cancelled')}
              >
                <Text style={styles.filterItemText}>Cancelled</Text>
                {filters.status === 'cancelled' && <IconSvg name="check-circle" size={16} color="#2563eb" />}
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.clearFiltersButton}
                onPress={clearFilters}
              >
                <Text style={styles.clearFiltersText}>Clear</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ) : isLargeMobile ? (
        /* Large Mobile layout for iPhone XR, etc */
        <View style={styles.largeMobileSearchSection}>
          <View style={styles.largeMobileSearchContainer}>
            <IconSvg name="search" size={15} color="#666" style={styles.searchIcon} />
            <TextInput
              style={styles.largeMobileSearchInput}
              placeholder="Search ID..."
              placeholderTextColor="#999"
              value={filters.customerId}
              onChangeText={handleCustomerIdSearch}
              onSubmitEditing={handleSubmitSearch}
            />
            {filters.customerId ? (
              <TouchableOpacity 
                style={styles.clearButton} 
                onPress={clearSearch}
              >
                <IconSvg name="close" size={15} color="#999" />
              </TouchableOpacity>
            ) : null}
          </View>
          
          <TouchableOpacity 
            style={[styles.largeMobileFilterButton, filters.status ? styles.activeFilterButton : null]} 
            onPress={() => setShowFilterModal(!showFilterModal)}
          >
            <IconSvg name="settings" size={17} color={filters.status ? "#fff" : "#666"} />
          </TouchableOpacity>
          
          {/* Status Filter Modal for large mobile */}
          {showFilterModal && (
            <View style={styles.filterModal}>
              <Text style={styles.filterModalTitle}>Filter by Status</Text>
              <TouchableOpacity 
                style={[styles.filterItem, filters.status === 'pending' && styles.activeFilterItem]}
                onPress={() => handleStatusChange('pending')}
              >
                <Text style={styles.filterItemText}>Pending</Text>
                {filters.status === 'pending' && <IconSvg name="check-circle" size={16} color="#2563eb" />}
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.filterItem, filters.status === 'shipped' && styles.activeFilterItem]}
                onPress={() => handleStatusChange('shipped')}
              >
                <Text style={styles.filterItemText}>Shipped</Text>
                {filters.status === 'shipped' && <IconSvg name="check-circle" size={16} color="#2563eb" />}
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.filterItem, filters.status === 'delivered' && styles.activeFilterItem]}
                onPress={() => handleStatusChange('delivered')}
              >
                <Text style={styles.filterItemText}>Delivered</Text>
                {filters.status === 'delivered' && <IconSvg name="check-circle" size={16} color="#2563eb" />}
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.filterItem, filters.status === 'cancelled' && styles.activeFilterItem]}
                onPress={() => handleStatusChange('cancelled')}
              >
                <Text style={styles.filterItemText}>Cancelled</Text>
                {filters.status === 'cancelled' && <IconSvg name="check-circle" size={16} color="#2563eb" />}
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.clearFiltersButton}
                onPress={clearFilters}
              >
                <Text style={styles.clearFiltersText}>Clear Filters</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ) : (
        /* Normal layout for mobile and larger screens */
        <>
          {/* Mobile: Stack search and filter vertically when search is focused */}
          {isMobile && isSearchFocused ? (
            <View style={styles.mobileSearchFull}>
              <View style={styles.searchInputContainer}>
                <IconSvg
                  name="search"
                  size={16}
                  color="#666"
                  style={styles.searchIcon}
                />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search by customer ID..."
                  placeholderTextColor="#999"
                  value={filters.customerId}
                  onChangeText={handleCustomerIdSearch}
                  onSubmitEditing={handleSubmitSearch}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  autoFocus
                />
                {filters.customerId ? (
                  <TouchableOpacity
                    style={styles.clearButton}
                    onPress={clearSearch}
                  >
                    <IconSvg name="close" size={16} color="#999" />
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          ) : (
            <View
              style={[
                styles.searchSection,
                (isTablet || isDesktop) && styles.wideSearch,
              ]}
            >
              <View
                style={[
                  styles.searchInputContainer,
                  isMobile && styles.mobileSearchContainer,
                ]}
              >
                <IconSvg
                  name="search"
                  size={16}
                  color="#666"
                  style={styles.searchIcon}
                />
                <TextInput
                  style={[
                    styles.searchInput,
                    (isTablet || isDesktop) && styles.wideInput,
                  ]}
                  placeholder={
                    isMobile ? "Search..." : "Search by customer ID..."
                  }
                  placeholderTextColor="#999"
                  value={filters.customerId}
                  onChangeText={handleCustomerIdSearch}
                  onSubmitEditing={handleSubmitSearch}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
                {filters.customerId ? (
                  <TouchableOpacity
                    style={styles.clearButton}
                    onPress={clearSearch}
                  >
                    <IconSvg name="close" size={16} color="#999" />
                  </TouchableOpacity>
                ) : null}
              </View>

              <TouchableOpacity
                style={[
                  styles.filterButton,
                  filters.status ? styles.activeFilterButton : null,
                ]}
                onPress={() => setShowFilterModal(!showFilterModal)}
              >
                <IconSvg
                  name="settings"
                  size={18}
                  color={filters.status ? "#fff" : "#666"}
                />
                {(isTablet || isDesktop) && !isMobile ? (
                  <Text
                    style={[
                      styles.filterButtonText,
                      filters.status ? styles.activeFilterButtonText : null,
                    ]}
                  >
                    {filters.status || "Status"}
                  </Text>
                ) : null}
              </TouchableOpacity>

              {/* Status Filter Modal */}
              {showFilterModal && (
                <View style={styles.filterModal}>
                  <Text style={styles.filterModalTitle}>Filter by Status</Text>
                  <TouchableOpacity
                    style={[
                      styles.filterItem,
                      filters.status === "pending" && styles.activeFilterItem,
                    ]}
                    onPress={() => handleStatusChange("pending")}
                  >
                    <Text style={styles.filterItemText}>Pending</Text>
                    {filters.status === "pending" && (
                      <IconSvg name="check-circle" size={16} color="#2563eb" />
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.filterItem,
                      filters.status === "shipped" && styles.activeFilterItem,
                    ]}
                    onPress={() => handleStatusChange("shipped")}
                  >
                    <Text style={styles.filterItemText}>Shipped</Text>
                    {filters.status === "shipped" && (
                      <IconSvg name="check-circle" size={16} color="#2563eb" />
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.filterItem,
                      filters.status === "delivered" && styles.activeFilterItem,
                    ]}
                    onPress={() => handleStatusChange("delivered")}
                  >
                    <Text style={styles.filterItemText}>Delivered</Text>
                    {filters.status === "delivered" && (
                      <IconSvg name="check-circle" size={16} color="#2563eb" />
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.filterItem,
                      filters.status === "cancelled" && styles.activeFilterItem,
                    ]}
                    onPress={() => handleStatusChange("cancelled")}
                  >
                    <Text style={styles.filterItemText}>Cancelled</Text>
                    {filters.status === "cancelled" && (
                      <IconSvg name="check-circle" size={16} color="#2563eb" />
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.clearFiltersButton}
                    onPress={clearFilters}
                  >
                    <Text style={styles.clearFiltersText}>Clear Filters</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    zIndex: 10,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuButton: {
    marginRight: 16,
    padding: 4,
  },
  menuIcon: {
    fontSize: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 4,
    height: 36,
    flex:1,
    maxWidth:350,
    paddingLeft: 8,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    height: 32,
    fontSize: 14,
    paddingTop: 0,
    paddingBottom: 0,
    paddingHorizontal: 8,
  },
  clearButton: {
    padding: 4,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#f5f5f5",
  },
  activeFilterButton: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
  },
  filterButtonText: {
    fontSize: 14,
    marginLeft: 4,
    color: "#666",
  },
  activeFilterButtonText: {
    color: "#fff",
  },
  // Filter Modal
  filterModal: {
    position: "absolute",
    top: 50,
    right: 0,
    width: 200,
    backgroundColor: "#fff",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    padding: 8,
    zIndex: 100,
  },
  filterModalTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    paddingHorizontal: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  filterItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  activeFilterItem: {
    backgroundColor: "#f0f9ff",
  },
  filterItemText: {
    fontSize: 14,
  },
  clearFiltersButton: {
    marginTop: 8,
    padding: 8,
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 4,
  },
  clearFiltersText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  // Responsive styles
  wideSearch: {
    flex: 0.5,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  wideInput: {
    width: "100%",
  },
  mobileLeftSection: {
    flex: 1,
    maxWidth: "50%",
  },
  mobileTitle: {
    fontSize: 16,
    flex: 1,
  },
  mobileSearchFull: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    zIndex: 1000,
  },
  mobileSearchContainer: {
    flex: 1,
    maxWidth: 120,
  },
  // Small Mobile Styles (< 375px)
  smallMobileContainer: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  smallMobileLeftSection: {
    flex: 1,
    maxWidth: '45%',
  },
  smallMobileMenuButton: {
    marginRight: 8,
    padding: 2,
  },
  smallMobileTitle: {
    fontSize: 14,
    flex: 1,
  },
  smallMobileSearchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  smallMobileSearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    height: 28,
    paddingHorizontal: 6,
    flex: 1,
    maxWidth: 100,
    marginRight: 6,
  },
  smallMobileSearchInput: {
    height: 24,
    fontSize: 12,
    flex: 1,
    paddingTop: 0,
    paddingBottom: 0,
    paddingHorizontal: 4,
  },
  smallMobileClearButton: {
    padding: 2,
  },
  smallMobileFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#f5f5f5',
    minWidth: 28,
    height: 28,
  },
  smallMobileFilterModal: {
    width: 140,
    right: -20,
  },
  // Large Mobile Styles (iPhone XR, etc - 390px to 430px)
  largeMobileContainer: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  largeMobileLeftSection: {
    flex: 1,
    maxWidth: '50%',
  },
  largeMobileTitle: {
    fontSize: 17,
    flex: 1,
  },
  largeMobileSearchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  largeMobileSearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    height: 32,
    paddingHorizontal: 8,
    flex: 1,
    maxWidth: 140,
    marginRight: 8,
  },
  largeMobileSearchInput: {
    height: 28,
    fontSize: 13,
    flex: 1,
    paddingTop: 0,
    paddingBottom: 0,
    paddingHorizontal: 4,
  },
  largeMobileFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#f5f5f5',
    minWidth: 32,
    height: 32,
  },
});

export default Header;
