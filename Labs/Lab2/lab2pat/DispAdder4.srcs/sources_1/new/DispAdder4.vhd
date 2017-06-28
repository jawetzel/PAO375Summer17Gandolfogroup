----------------------------------------------------------------------------------
-- Company: 
-- Engineer: 
-- 
-- Create Date: 06/14/2017 02:35:02 PM
-- Design Name: 
-- Module Name: DispAdder4 - Behavioral
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
ENTITY DispAdder4 IS

PORT(
    a: IN STD_LOGIC_VECTOR(3 DOWNTO 0); -- Input SW[7..4]: a[3..0]
    b: IN STD_LOGIC_VECTOR(3 DOWNTO 0); -- Input SW[3..0]: b[3..0]
    led: OUT STD_LOGIC; -- Output LED[16]: cOut
     an: OUT STD_LOGIC_VECTOR(7 DOWNTO 0); -- Output AN[7..0]: '0' enabled
     hex: OUT STD_LOGIC_VECTOR(6 DOWNTO 0) -- Output HEX[6..0]: sum[3..0]
);
END DispAdder4;

ARCHITECTURE behavioral OF DispAdder4 IS

    signal coutFinal : std_logic;
    signal array1,array2 : std_logic_vector(3 downto 0);
COMPONENT Adder4 --4-bit full adder (Adder4.vhd)

PORT(
    a: IN STD_LOGIC_VECTOR(3 DOWNTO 0);
    b: IN STD_LOGIC_VECTOR(3 DOWNTO 0);
    cOut: OUT STD_LOGIC;
    sum: OUT STD_LOGIC_VECTOR(3 DOWNTO 0)
);

END COMPONENT;

COMPONENT Bin2Hex --4-bit binary inputs to 7-segment hex display (Bin2Hex.vhd)
PORT(
    bin: IN STD_LOGIC_VECTOR(3 DOWNTO 0);
    hex: OUT STD_LOGIC_VECTOR(6 DOWNTO 0)
);
END COMPONENT;

SIGNAL carry_sig: STD_LOGIC;
SIGNAL sum_sig: STD_LOGIC_VECTOR(3 DOWNTO 0);
SIGNAL hex_sig, hex_sig2: STD_LOGIC_VECTOR(6 DOWNTO 0);

BEGIN
--displayUnit: DispAdder4
--PORT MAP(bin <= sum, bin <= carrySum)

U1 : Adder4 PORT MAP(a => a, b => b, cOut => coutFinal, sum => array1);

led <= coutFinal;

PROCESS(coutFinal)
   BEGIN
        array2(3) <= '0';
        array2(2) <= '0';
        array2(1) <= '0';
        array2(0) <= '0';
      IF coutFinal = '1' THEN
       array2(3) <= '1';
      End IF;
      
   -- sum <= carrySum;
 End PROCESS;
 
 U2 : Bin2Hex PORT MAP(bin => array1, hex =>hex_sig);
 U3 : Bin2Hex PORT MAP(bin => array2, hex =>hex_sig2);
 
 hex <=  hex_sig;
 an(0) <= '0';
 an(1) <= '1';
 an(2) <= '1';
 an(3) <= '1';
 an(4) <= '1';
 an(5) <= '1';
 an(6) <= '1';
 an(7) <= '1';
 
END behavioral;