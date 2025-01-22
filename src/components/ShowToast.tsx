import Toast from 'react-native-toast-message';

interface ShowToastParams {
  text1: string;
  text2?: string;
}

export const successToast = ({ text1, text2 }: ShowToastParams) => {
  Toast.show({
    type: 'success',
    text1,
    text2,
    visibilityTime: 2000,
  });
};

export const errorToast = ({ text1, text2 }: ShowToastParams) => {
  Toast.show({
    type: 'error',
    text1,
    text2,
    visibilityTime: 2000,
  });
};

export const infoToast = ({ text1, text2 }: ShowToastParams) => {
  Toast.show({
    type: 'info',
    text1,
    text2,
    visibilityTime: 2000,
  });
};