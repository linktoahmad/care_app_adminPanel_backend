import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  imgBanner: {
    width: '100%',
    height: 250,
    position: 'absolute',
  },
  rowBanner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'white',
    marginRight: 5,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  contentButtonBottom: {
    borderTopWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    borderBottomWidth: 1,
    paddingVertical: 10,
    alignItems: 'flex-start',
  },
  linePrice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  iconRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapContent: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
});
