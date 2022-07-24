import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';

export default StyleSheet.create({
  content: {
    padding: 10,
    borderRadius: 8,
  },
  contentTop: {
    flexDirection: 'row',
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  line: {
    width: '100%',
    height: 1,
    borderWidth: 0.5,
    borderStyle: 'dashed',
  },
  contentLine: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    position: 'absolute',
  },
  contentBottom: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  bottomLeft: {flexDirection: 'row', alignItems: 'center'},
  image: {width: 32, height: 32, marginRight: 10, borderRadius: 16},
});
