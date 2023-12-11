import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {View, Text} from '@gluestack-ui/themed';
import ListAllAvatar from './ListAllAvatar';
import UnownAvatars from '../feature/avatar/UnownAvatars';

interface AccordionProps {
  handleAvatarClick: (avatarId: string) => void;
  selectedAvatarId: string;
}

export default function AccordionComponent({
  handleAvatarClick,
  selectedAvatarId,
}: AccordionProps) {
  const [activeTab, setActiveTab] = useState('listAllAvatar');
  
  const toggleTab = (tab: any) => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  useEffect(() => {
    setActiveTab('listAllAvatar');
  }, []);

  return (
    <View
      display="flex"
      flexDirection="row"
      width="100%"
      height={'100%'}
      justifyContent="center">
      <View
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        width={'100%'}>
        <TouchableOpacity onPress={() => toggleTab('listAllAvatar')}>
          <Text
            backgroundColor={
              activeTab === 'listAllAvatar' ? '#12486B' : 'transparent'
            }
            padding={10}
            borderRadius={10}
            color={activeTab === 'listAllAvatar' ? 'white' : 'gray'}>
            Your Avatar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleTab('unownAvatars')}>
          <Text
            padding={10}
            borderRadius={10}
            backgroundColor={
              activeTab === 'unownAvatars' ? '#12486B' : 'transparent'
            }
            color={activeTab === 'unownAvatars' ? 'white' : 'gray'}>
            Other Avatar
          </Text>
        </TouchableOpacity>
      </View>

      <View position="absolute" width={'100%'} height={'100%'} top={60}>
        {activeTab === 'listAllAvatar' && (
          <View>
            <ListAllAvatar
              handleAvatarClick={handleAvatarClick}
              selectedAvatarId={selectedAvatarId}
            />
          </View>
        )}
        {activeTab === 'unownAvatars' && (
          <View>
            <UnownAvatars
              handleAvatarClick={handleAvatarClick}
              selectedAvatarId={selectedAvatarId}
            />
          </View>
        )}
      </View>
    </View>
  );
}
