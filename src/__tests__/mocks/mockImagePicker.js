/**
 * Mock para expo-image-picker
 * Este archivo proporciona un mock para las funciones de expo-image-picker
 * que se utilizan en las pruebas.
 */

const mockImagePicker = {
  requestMediaLibraryPermissionsAsync: jest.fn(() => 
    Promise.resolve({ status: 'granted', granted: true })
  ),
  
  requestCameraPermissionsAsync: jest.fn(() => 
    Promise.resolve({ status: 'granted', granted: true })
  ),
  
  launchImageLibraryAsync: jest.fn(() => 
    Promise.resolve({
      cancelled: false,
      canceled: false,
      assets: [{
        uri: 'file://mock-image.jpg',
        width: 1000,
        height: 1000,
        type: 'image',
        fileName: 'mock-image.jpg',
        fileSize: 1000000
      }]
    })
  ),
  
  launchCameraAsync: jest.fn(() => 
    Promise.resolve({
      cancelled: false,
      canceled: false,
      assets: [{
        uri: 'file://mock-camera-image.jpg',
        width: 1000,
        height: 1000,
        type: 'image',
        fileName: 'mock-camera-image.jpg',
        fileSize: 1000000
      }]
    })
  ),
  
  MediaTypeOptions: {
    All: 'All',
    Images: 'Images',
    Videos: 'Videos'
  },
  
  UIImagePickerControllerQualityType: {
    High: 'High',
    Medium: 'Medium',
    Low: 'Low'
  }
};

export default mockImagePicker; 