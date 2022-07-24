import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  banner: {
    height: 135,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'flex-start',
    width: '100%',
    padding: 20,
  },
  team: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  title: {paddingHorizontal: 20, paddingBottom: 15},
});
