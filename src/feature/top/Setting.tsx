import {
  Button,
  ButtonIcon,
  SettingsIcon,
  Center,
  ButtonText,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Heading,
  Text,
  Icon,
  CloseIcon,
  View,
  Input,
  InputSlot,
  InputIcon,
  InputField,
  AtSignIcon,
} from '@gluestack-ui/themed';
import React, {useState} from 'react';
import {useAuth} from '../../hooks/useAuth';
import {useSelector, useDispatch} from 'react-redux';
import {UPDATE_FULLNAME} from '../../store/slice/AuthSlice';
import {RootState} from '../../store/type/RootState';
import {API} from '../../libs/api';
const Setting = ({navigation}: any) => {
  const [showModal, setShowModal] = useState(false);
  const auth = useSelector((state: RootState) => state.auth);
  const [fullname, setFullname] = useState(auth.fullname);
  const dispatch = useDispatch();

  function handleChange(value: string) {
    setFullname(value);
  }
  async function handleUpdateFullname() {
    try {
      const dataToSend = {
        fullname: fullname,
      };
      const headers = {
        Authorization: `Bearer ${auth.token}`,
      };

      const response = await API.patch('/user', dataToSend, {headers});
      console.log('Success change fullname', response.data);
      dispatch(
        UPDATE_FULLNAME({
          fullname: response.data.data.fullname,
        }),
      );
    } catch (error) {
      console.log(error);
    }
  }

  const ref = React.useRef(null);
  const {logout} = useAuth({navigation});
  const handleLogout = async () => {
    await logout();
    setShowModal(false);
    navigation.navigate('Login');
  };
  return (
    <Center>
      <Button
        size="md"
        backgroundColor="white"
        $active-bgColor="#001524"
        variant="solid"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}
        rounded="$full"
        width={10}
        onPress={() => {
          setShowModal(true);
        }}
        ref={ref}>
        <ButtonIcon as={SettingsIcon} color="#12486B" />
      </Button>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        finalFocusRef={ref}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Setting</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <View width="100%" marginBottom={50}>
              <Text fontWeight="bold" marginBottom={2}>
                Change name
              </Text>
              <View
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center">
                <Input width="65%">
                  <InputSlot pl="$3">
                    <InputIcon as={AtSignIcon} />
                  </InputSlot>
                  <InputField
                    placeholder="Username..."
                    value={fullname}
                    onChangeText={handleChange}
                  />
                </Input>
                <Button
                  size="sm"
                  action="positive"
                  borderWidth="$0"
                  height={40}
                  backgroundColor="#12486B"
                  $active-bgColor="#001524"
                  onPress={() => {
                    setShowModal(false);
                    handleUpdateFullname();
                  }}>
                  <ButtonText>Confirm</ButtonText>
                </Button>
              </View>
            </View>
            <View>
              <Text fontWeight="bold">Change your account ?</Text>
            </View>
            <Text fontSize={12} color="gray">
              Are you sure to change your account?
            </Text>
          </ModalBody>
          <ModalFooter justifyContent="flex-start">
            <Button
              size="sm"
              width="100%"
              action="positive"
              borderWidth="$0"
              backgroundColor="#D71313"
              $active-bgColor="#001524"
              onPress={handleLogout}>
              <ButtonText>Logout</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
};

export default Setting;
