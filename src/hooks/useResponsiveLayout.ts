import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

// Define breakpoints
const breakpoints = {
  smallMobile: 0,
  mobile: 390,
  largeMobile: 430,
  tablet: 768,
  desktop: 1024,
};

export const useResponsiveLayout = () => {
  const [windowDimensions, setWindowDimensions] = useState(Dimensions.get('window'));
  const [deviceType, setDeviceType] = useState('smallMobile');

  useEffect(() => {
    const updateLayout = () => {
      const dimensions = Dimensions.get('window');
      setWindowDimensions(dimensions);

      if (dimensions.width >= breakpoints.desktop) {
        setDeviceType('desktop');
      } else if (dimensions.width >= breakpoints.tablet) {
        setDeviceType('tablet');
      } else if (dimensions.width >= breakpoints.largeMobile) {
        setDeviceType('largeMobile');
      } else if (dimensions.width >= breakpoints.mobile) {
        setDeviceType('mobile');
      } else {
        setDeviceType('smallMobile');
      }
    };

    // Set initial layout
    updateLayout();

    // Add event listener for dimension changes
    const subscription = Dimensions.addEventListener('change', updateLayout);

    // Clean up
    return () => subscription?.remove();
  }, []);

  const isSmallMobile = deviceType === 'smallMobile';
  const isMobile = deviceType === 'mobile' || isSmallMobile;
  const isLargeMobile = deviceType === 'largeMobile';
  const isTablet = deviceType === 'tablet';
  const isDesktop = deviceType === 'desktop';

  return {
    width: windowDimensions.width,
    height: windowDimensions.height,
    deviceType,
    isSmallMobile,
    isMobile,
    isLargeMobile,
    isTablet,
    isDesktop,
  };
};
