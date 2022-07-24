import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  imgBanner: {
    width: '100%',
    height: 250,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentButtonBottom: {
    borderTopWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabbar: {
    height: 40,
  },
  tab: {
    width: 130,
  },
  indicator: {
    height: 1,
  },
  label: {
    fontWeight: '400',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  lineInfor: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  todoTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
    alignItems: 'center',
    width: '100%',
  },
  itemReason: {
    marginTop: 10,
    flexDirection: 'row',
    width: '100%',
  },
  serviceItem: {
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  mapContent: {
    height: 180,
    width: '100%',
    marginVertical: 15,
  },
});
