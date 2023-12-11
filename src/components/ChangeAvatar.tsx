import {ButtonIcon} from '@gluestack-ui/themed';
import {EditIcon} from '@gluestack-ui/themed';
import {
  Center,
  Button,
  ButtonText,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalBackdrop,
  View,
  Text,
} from '@gluestack-ui/themed';
import React, {useState} from 'react';
import ListAllAvatar from './ListAllAvatar';
import {useDispatch, useSelector} from 'react-redux';
import {UPDATE_AVATAR} from '../store/slice/AuthSlice';
import {API} from '../libs/api';
import {RootState} from '../store/type/RootState';
import {useAuth} from '../hooks/useAuth';
import UnownAvatars from '../feature/avatar/UnownAvatars';
import AccordionComponent from './Accordion';

export default function ChangeAvatar({navigation}: any) {
  const [showModal, setShowModal] = useState(false);
  const ref = React.useRef(null);
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const {Users} = useAuth({navigation});
  const userLogin = Array.isArray(Users)
    ? Users.filter((user: any) => user.email === auth.email)
    : [];
  const dataUserLogin = userLogin[0];

  const [selectedAvatarId, setSelectedAvatarId] = useState<any>(null);
  const handleAvatarClick = (avatarId: any) => {
    setSelectedAvatarId(avatarId);
  };
  async function handleUpdateAvatar() {
    try {
      const dataToSend = {
        avatar: selectedAvatarId,
        fullname: dataUserLogin.fullname,
      };
      const headers = {
        Authorization: `Bearer ${auth.token}`,
      };

      const response = await API.patch('/user', dataToSend, {headers});
      console.log('Success change avatar', response.data);
      dispatch(
        UPDATE_AVATAR({
          avatar: response.data.data.avatar,
        }),
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Center h={300}>
      <Button
        onPress={() => setShowModal(true)}
        ref={ref}
        borderRadius="$full"
        width={0}
        h={43}
        p="$3.5"
        bg="white"
        borderColor="white"
        borderWidth={2}
        $active-borderColor="#12486B">
        <ButtonIcon as={EditIcon} color="#12486B" size="xs" />
      </Button>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader />
          <ModalBody>
            <View
              backgroundColor="transparent"
              width={'100%'}
              height={'60%'}
              borderRadius="$2xl"
              padding="$4"
              alignItems="center"
              marginBottom="$2">
              <View marginBottom="$10">
                <Heading size="lg">Change your avatar</Heading>
              </View>
              <View height={400}>
                <AccordionComponent
                  handleAvatarClick={handleAvatarClick}
                  selectedAvatarId={selectedAvatarId}
                />
              </View>
              {/* <View
                flexDirection="row"
                flexWrap="wrap"
                width={'100%'}
                justifyContent="space-between"
                gap={10}>
                <Text textAlign="center">Your avatar</Text>
                <ListAllAvatar
                  handleAvatarClick={handleAvatarClick}
                  selectedAvatarId={selectedAvatarId}
                />
              </View>
              <View
                flexDirection="row"
                flexWrap="wrap"
                width={'100%'}
                justifyContent="space-between"
                gap={10}>
                <Text>Other avatar</Text>
                <UnownAvatars
                  handleAvatarClick={handleAvatarClick}
                  selectedAvatarId={selectedAvatarId}
                />
              </View> */}
            </View>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              mr="$3"
              onPress={() => {
                setShowModal(false);
              }}>
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              size="sm"
              backgroundColor="#12486B"
              $active-bgColor="#001524"
              width={80}
              action="positive"
              borderWidth="$0"
              onPress={() => {
                setShowModal(false);
                handleUpdateAvatar();
              }}>
              <ButtonText>Buy</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}
