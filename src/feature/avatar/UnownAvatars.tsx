import React from 'react';
import {View, Avatar, AvatarImage, Button, Text} from '@gluestack-ui/themed';
import {useAvatar} from '../../hooks/useAvatar';

const UnownAvatars = ({handleAvatarClick, selectedAvatarId}: any) => {
  const {AvatarsUser} = useAvatar();

  const ownedAvatars = AvatarsUser?.filter(
    (avatar: {owned: boolean}) => avatar.owned === false,
  );

  const avatarRows = [];
  if (Array.isArray(ownedAvatars)) {
    for (let i = 0; i < ownedAvatars.length; i += 3) {
      avatarRows.push(ownedAvatars.slice(i, i + 3));
    }
  }

  return (
    <View
      flexDirection="row"
      flexWrap="wrap"
      width={'100%'}
      alignItems="center"
      justifyContent="center">
      {avatarRows.map((row, rowIndex) => (
        <View key={rowIndex} flexDirection="row" gap={10}>
          {row.map((avatar, index) => (
            <Button
              key={index}
              display="flex"
              flexDirection="column"
              bgColor={selectedAvatarId === avatar.id ? 'gray' : 'transparent'}
              width={60}
              height={85}
              style={{
                marginRight:
                  rowIndex === avatarRows.length - 1 &&
                  row.length < 3 &&
                  index === row.length - 1
                    ? 'auto'
                    : undefined,
              }}
              onPress={() => handleAvatarClick(avatar.id)}>
              <Avatar bgColor="transparent" size="md" borderRadius="$full">
                <AvatarImage source={{uri: avatar.image}} />
              </Avatar>
              <Text fontSize="$xs" width="200%">
                {avatar.owned === true ? 'owned' : avatar.price}
              </Text>
            </Button>
          ))}
        </View>
      ))}
    </View>
  );
};

export default UnownAvatars;
