import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';

export default StyleSheet.create({
  location: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  contentInfor: {flexDirection: 'row', paddingTop: 20},
  contentInforLeft: {
    flex: 1,
    paddingLeft: 10,
  },
  itemInfor: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabbar: {
    height: 40,
  },
  tab: {
    width: 100,
  },
  indicator: {
    height: 1,
  },
  label: {
    fontWeight: '400',
  },
  containProfileItem: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 20,
  },
});
