import { useColorMode, Button, Flex, useBreakpointValue, useColorModeValue } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

function ThemeToggleButton() {
  const { colorMode, toggleColorMode } = useColorMode();
  const showLabel = useBreakpointValue({ base: false, md: true });

  return (
    <Flex justify="flex-start"_hover={{ bg: "whiteAlpha.400" }}  borderRadius={6} mb={{base:0, sm:0 , md:0}}>
      <Button
        onClick={toggleColorMode}
        leftIcon={colorMode === "light" ? <MoonIcon color={useColorModeValue("blue.500", "white")} /> : <SunIcon   />}
        variant="ghost"
        size={useBreakpointValue({ base: "sm", sm: "sm", md:"lg" })}
        w="full"
        justifyContent="flex-start" 
        iconSpacing={{base:0 ,md:8}}
        pl={{sm:4}}
      >
        {showLabel ? (colorMode === "light" ? "Light" : "Dark") : null}
      </Button>
    </Flex>
  );
}

export default ThemeToggleButton;
