import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';

export default StyleSheet.create({
  contentButtonBottom: {
    borderTopWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lineSeatType: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderBottomWidth: 1,
  },
  booked: {
    width: 30,
    height: 30,
    borderRadius: 8,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    width: 30,
    height: 30,
    borderRadius: 8,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: {
    width: 30,
    height: 30,
    borderRadius: 8,
    marginBottom: 5,
    backgroundColor: BaseColor.grayColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lineDirection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  itemSeat: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
});
