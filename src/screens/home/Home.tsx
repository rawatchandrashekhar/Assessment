import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {styles} from './HomeStyle';
import {APIEndpoints} from '../../API/APIEndpoints';
import {GetImageDataTypes} from '../../types/HomeScreenTypes';
import {COLORS} from '../../assets/colors';
import FooterComponent from './component/FooterComponent';
import {RootStackParamList} from '../../navigation/NavigationType';

const Home = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

  const [imageData, setImageData] = useState<GetImageDataTypes[]>([]);
  const [isHasMoreData, setIsHasMoreData] = useState(true);
  const [screenLoading, setScreenLoading] = useState(true);
  const [btnLoader, setBtnLoader] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  const handleGetImageData = async () => {
    try {
      setBtnLoader(true);
      const formData = new FormData();
      formData.append('user_id', 108);
      formData.append('offset', page);
      formData.append('type', 'popular');
      const response = await fetch(APIEndpoints.getImageData, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (result?.images?.length > 0) {
        setImageData(prev => [...prev, ...result?.images]);
        setPage(prev => prev + 1);
      } else {
        setIsHasMoreData(false);
      }
      setScreenLoading(false);
      setBtnLoader(false);
    } catch (error: any) {
      setScreenLoading(false);
      setBtnLoader(false);
      setError(error?.message);
    }
  };

  useEffect(() => {
    handleGetImageData();
  }, []);

  if (screenLoading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator color={COLORS.black} size="large" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <Text>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={imageData}
        keyExtractor={(item, index) => `${item?.id}-${index}`}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('ImageDetailedScreen', {
                  image: item?.xt_image,
                })
              }
              style={styles.imageContainer}>
              <Image source={{uri: item?.xt_image}} style={styles.images} />
            </TouchableOpacity>
          );
        }}
        ListFooterComponent={
          isHasMoreData ? (
            <FooterComponent
              disabled={btnLoader}
              loading={btnLoader}
              onPress={handleGetImageData}
            />
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default Home;
