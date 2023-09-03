"use client";

import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuGroup,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LogOut as LogOutIcon } from "react-feather";

import { MakeRequired } from "@forms/types/global/makeRequired";

import { useTranslation } from "@app/i18n/client";
import { UserSession } from "@app/types";

interface SettingsMenuProps {
  session: MakeRequired<UserSession, "user">;
  isPrimary?: boolean;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({ session }) => {
  const [lng, setLng] = useState("");

  const { t, i18n } = useTranslation();

  const handleLanguageChange = (selectedLang: string) => {
    i18n.changeLanguage(selectedLang);
  };

  useEffect(() => {
    setLng(i18n.language);
  }, [i18n.language]);

  return (
    <div className="flex gap-4">
      {session.user.image && (
        <Menu>
          <MenuButton
            as={Button}
            w="37px"
            p="0"
            borderRadius={"100%"}
            bg="none"
            _hover={{ bg: "none" }}
            _active={{ bg: "none" }}
            aria-label={t("commons.settings")}
          >
            <Image
              src={session?.user.image}
              height={37}
              width={37}
              className="rounded-full"
              alt="profile image"
            />
          </MenuButton>
          <MenuList>
            <RadioGroup onChange={handleLanguageChange} value={lng}>
              <MenuGroup title={t("commons.language")}>
                <MenuItem onClick={() => handleLanguageChange("en")}>
                  <Radio value="en">English</Radio>
                </MenuItem>
                <MenuItem onClick={() => handleLanguageChange("pt")}>
                  <Radio value="pt">Português (Brasil)</Radio>
                </MenuItem>
              </MenuGroup>
            </RadioGroup>
            <MenuDivider />
            <MenuItem onClick={() => signOut()}>
              <LogOutIcon size={16} className="mr-2" /> {t("commons.signOut")}
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </div>
  );
};

export default SettingsMenu;
