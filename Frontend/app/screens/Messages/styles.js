import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  inputContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    flexDirection: 'row',
  },
  sendIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  userContent: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    marginTop: 24,
  },
  userContentMessage: {
    marginTop: 8,
    padding: 16,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    flex: 1,
  },
  userContentDate: {flex: 3, justifyContent: 'center'},
  meContent: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  meContentDate: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  meContentMessage: {
    marginTop: 8,
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    flex: 1,
  },
});
