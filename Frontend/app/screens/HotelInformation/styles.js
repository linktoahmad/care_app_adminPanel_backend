import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';
import * as Utils from '@utils';

export default StyleSheet.create({
  contentGallery: {width: '100%', height: Utils.scaleWithPixel(205)},
  galleryLineTop: {
    flexDirection: 'row',
    flex: 1,
    paddingBottom: 5,
  },
  galleryLineBottom: {
    flexDirection: 'row',
    flex: 1,
  },
  line: {
    height: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  contentButtonBottom: {
    borderTopWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentTag: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  contentTodo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 20,
    paddingHorizontal: 20,
  },
});
