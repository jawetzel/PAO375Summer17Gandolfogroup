----------------------------------------------------------------------------------
-- Company: 
-- Engineer: 
-- 
-- Create Date: 06/14/2017 09:53:58 PM
-- Design Name: 
-- Module Name: Bin2Hex_tb - Behavioral
-- Project Name: 
-- Target Devices: 
-- Tool Versions: 
-- Description: 
-- 
-- Dependencies: 
-- 
-- Revision:
-- Revision 0.01 - File Created
-- Additional Comments:
-- 
----------------------------------------------------------------------------------


library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

-- Uncomment the following library declaration if using
-- arithmetic functions with Signed or Unsigned values
--use IEEE.NUMERIC_STD.ALL;

-- Uncomment the following library declaration if instantiating
-- any Xilinx leaf cells in this code.
--library UNISIM;
--use UNISIM.VComponents.all;

ENTITY Bin2Hex_tb IS
END Bin2Hex_tb;
ARCHITECTURE simulate OF Bin2Hex_tb IS
 COMPONENT Bin2Hex
 PORT (
 bin: IN STD_LOGIC_VECTOR(3 DOWNTO 0); -- Input bin[3..0]
 hex: OUT STD_LOGIC_VECTOR(6 DOWNTO 0) -- Output hex[6..0] 7-sigment display
 );
 END COMPONENT;
 SIGNAL bin: STD_LOGIC_VECTOR(3 DOWNTO 0);
 SIGNAL hex: STD_LOGIC_VECTOR(6 DOWNTO 0); -- Hex to display
 
BEGIN
 uut: Bin2Hex PORT MAP (bin, hex);

 stimulus: PROCESS
 BEGIN
 -- test bench stimulus code
 bin <= "0000"; -- 0
 WAIT FOR 60 ns;
 bin <= "0001"; -- 1
 WAIT FOR 60 ns;
 bin <= "0010"; -- 2
 WAIT FOR 60 ns;
 bin <= "0011"; -- 3
 WAIT FOR 60 ns;
 bin <= "0100"; -- 4
 WAIT FOR 60 ns;
 bin <= "0101"; -- 5
 WAIT FOR 60 ns;
 bin <= "0110"; -- 6
 WAIT FOR 60 ns;
 bin <= "0111"; -- 7
 WAIT FOR 60 ns;
 bin <= "1000"; -- 8
 WAIT FOR 60 ns;
 bin <= "1001"; -- 9
 WAIT FOR 60 ns;
 bin <= "1010"; -- A
 WAIT FOR 60 ns;
 bin <= "1011"; -- b
 WAIT FOR 60 ns;
 bin <= "1100"; -- C
 WAIT FOR 60 ns;
 bin <= "1101"; -- d
 WAIT FOR 60 ns;
 bin <= "1110"; -- E
 WAIT FOR 60 ns;
 bin <= "1111"; -- F
 WAIT FOR 60 ns;
 bin <= "0000"; -- 0
 WAIT FOR 60 ns;

 WAIT;
 END PROCESS;
END simulate;
