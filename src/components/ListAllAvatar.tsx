import React from 'react';
import {View, Avatar, AvatarImage, Button, Text} from '@gluestack-ui/themed';
import {useAvatar} from '../hooks/useAvatar';

const ListAllAvatar = ({handleAvatarClick, selectedAvatarId}: any) => {
  const {AvatarsUser} = useAvatar();
  console.log(AvatarsUser);

  const ownedAvatars = AvatarsUser?.filter(
    (avatar: {owned: boolean}) => avatar.owned === true,
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
        <View key={rowIndex} flexDirection="row" gap={20}>
          {row.map((avatar, index) => (
            <Button
              key={index}
              marginBottom={10}
              display="flex"
              flexDirection="column"
              $active={{bgColor: '#12486B'}}
              bgColor={
                selectedAvatarId === avatar.id ? '#12486B' : 'transparent'
              }
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
              <Text
                fontSize="$xs"
                width="200%"
                color={selectedAvatarId === avatar.id ? 'white' : 'black'}
                $active={{color: 'white'}}>
                {avatar.owned === true ? 'owned' : avatar.price}
              </Text>
            </Button>
          ))}
        </View>
      ))}
    </View>
  );
};

export default ListAllAvatar;
