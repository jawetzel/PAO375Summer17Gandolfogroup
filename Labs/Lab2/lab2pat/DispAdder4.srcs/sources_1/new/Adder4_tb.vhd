----------------------------------------------------------------------------------
-- Company: 
-- Engineer: 
-- 
-- Create Date: 06/14/2017 02:35:02 PM
-- Design Name: 
-- Module Name: Adder4_tb - Behavioral
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

LIBRARY IEEE;
USE IEEE.STD_LOGIC_1164.ALL;
ENTITY Adder4_tb IS
END Adder4_tb;
ARCHITECTURE simulate OF Adder4_tb IS
 COMPONENT Adder4
 
 PORT (
     a, b: IN STD_LOGIC_VECTOR(3 DOWNTO 0);
     cOut: OUT STD_LOGIC;
     sum: OUT STD_LOGIC_VECTOR(3 DOWNTO 0)
 );
 
 END COMPONENT;
 
 SIGNAL a, b: STD_LOGIC_VECTOR(3 DOWNTO 0);
 SIGNAL cOut: STD_LOGIC;
 SIGNAL sum: STD_LOGIC_VECTOR(3 DOWNTO 0);
 
BEGIN
 uut: Adder4 PORT MAP (a, b, cOut, sum);

 stimulus: PROCESS
 BEGIN
 -- test bench stimulus code
 a <= "0000"; b <= "0101"; -- 0 + 5 => 05 (0 0101)
 WAIT FOR 100 ns;
 a <= "0001"; b <= "0111"; -- 1 + 7 => 08 (0 1000)
 WAIT FOR 100 ns;
 a <= "0010"; b <= "1001"; -- 2 + 9 => 0B (0 1011)
 WAIT FOR 100 ns;
 a <= "0011"; b <= "1011"; -- 3 + B => 0E (0 1110)
 WAIT FOR 100 ns;
 a <= "0100"; b <= "1101"; -- 4 + D => 11 (1 0001)
 WAIT FOR 100 ns;
 a <= "0101"; b <= "1111"; -- 5 + F => 14 (1 0100)
 WAIT FOR 100 ns;
 a <= "0110"; b <= "0001"; -- 6 + 1 => 07 (0 0111)
 WAIT FOR 100 ns;
 a <= "0111"; b <= "0011"; -- 7 + 3 => 0A (0 1010)
 WAIT FOR 100 ns;
 a <= "1000"; b <= "0101"; -- 8 + 5 => 0D (0 1101)
 WAIT FOR 100 ns;
 a <= "1001"; b <= "0111"; -- 9 + 7 => 10 (1 0000)
 WAIT FOR 100 ns;

 WAIT;
 END PROCESS;
END simulate;
