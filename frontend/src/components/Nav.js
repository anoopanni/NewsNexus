import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

import {
  chakra,
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { SearchBar } from './SearchBar';



export default function Nav({isDashboard, setData, categories, sources}) {
  const navigate = useNavigate();
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const handleClick = (path) => {
    navigate(`/${path}`); 
  };

  const ClickableBox = chakra(Box, {
    baseStyle: {
      cursor: 'pointer',
    },
  });

  
  const requestNotificationPermission = async () => {
    // send notification only if the URL is dashboard
    if(isDashboard){

    if ('Notification' in window && Notification.permission === 'granted') {
      let notification = new Notification("Lucknow Gets Own IPL Team: All You Need To Know About Sanjiv Goenka's Lucknow IPL Team", {
        body: 'Sanjiv Goenka, owner of RPSG Group won the bid for new IPL Franchise and it will have new team of Lucknow IPL in Uttar Pradesh',
        icon: '../resources/news.png'
      });
      notification.onclick = function() {
        window.open('https://www.sentinelassam.com/sports-news/lucknow-gets-own-ipl-team-all-you-need-to-know-about-sanjiv-goenkas-lucknow-ipl-team-560551');
       };
    }
    else if ('Notification' in window && Notification.permission !== 'granted') {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Notification permission granted!');
      }
    }
  }
  };
  

  const { logout } = useAuth0();
  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>

          <ClickableBox onClick={() => handleClick("dashboard")}>News Nexus</ClickableBox>

          {isDashboard && <SearchBar setData={setData} categories={categories} sources={sources} />}

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem onClick={() => handleClick("dashboard")}>Dashboard</MenuItem>
                  <MenuItem onClick={() => handleClick("admin")}>Admin</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}