----------------------------------------------------------------------------------
-- Company: 
-- Engineer: 
-- 
-- Create Date: 06/14/2017 02:35:02 PM
-- Design Name: 
-- Module Name: Bin2Hex - Behavioral
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

-- Uncomment the following library declaration if using
-- arithmetic functions with Signed or Unsigned values
--use IEEE.NUMERIC_STD.ALL;

-- Uncomment the following library declaration if instantiating
-- any Xilinx leaf cells in this code.
--library UNISIM;
--use UNISIM.VComponents.all;

LIBRARY IEEE;
USE IEEE.STD_LOGIC_1164.ALL;
ENTITY Bin2Hex IS

PORT(
    bin: IN STD_LOGIC_VECTOR(3 DOWNTO 0); -- 4-bit binary inputs
    hex: OUT STD_LOGIC_VECTOR(6 DOWNTO 0) -- 7-segment hex display
);


END Bin2Hex;

ARCHITECTURE behavioral OF Bin2Hex IS

BEGIN
-- Write Your Code Here
process(bin)
begin
    case bin is
           when "0000" => hex <= "1000000"; --0
           
           when "0001" => hex <= "1111001"; --1
           when "0010" => hex <= "0100100"; --2
           when "0011" => hex <= "0110000"; --3
           when "0100" => hex <= "0011001"; --4
           when "0101" => hex <= "0010010"; --5
           
           when "0110" => hex <= "0000010"; --6 
           when "0111" => hex <= "1111000"; --7
           when "1000" => hex <= "0000000"; --8
           when "1001" => hex <= "0010000"; --9
           when "1010" => hex <= "0001000"; --A
           when "1011" => hex <= "0000011"; --B
           when "1100" => hex <= "1000110"; --C
           when "1101" => hex <= "0100001"; --D
           when "1110" => hex <= "0000110"; --E
           when others => hex <= "0001110"; --F
          end case;
  end process;

END behavioral;
