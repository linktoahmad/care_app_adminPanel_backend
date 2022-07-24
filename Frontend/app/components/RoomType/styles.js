import {StyleSheet} from 'react-native';
import * as Utils from '@utils';
import {BaseColor} from '@config';

export default StyleSheet.create({
  listImage: {
    height: Utils.scaleWithPixel(140),
    width: Utils.scaleWithPixel(120),
    borderRadius: 8,
  },
  listContent: {
    flexDirection: 'row',
  },
  listContentRight: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flex: 1,
  },
  listContentService: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
});
