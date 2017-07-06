--------------------------------------------------------------------------------
-- Description: Display 4-bit ALU (Test Bench)
-- Program-ID: DispAlu4_tb.vhd
-- Author: Kuo-pao Yang
-- Package: Xilinx Nexys4 DDR Board
-- Device: Artix-7 FPGA (XC7A100TCSG324-1)
-- Software: Vivado Design Suite
-- Note:
-- 1. COMPONENT: 4-bit Alu (Alu4.vhd)
-- 2. COMPONENT: 4-bit binary inputs to 7-segment hex display (Bin2Hex.vhd)
-- 3. Input from switches and results shown on LEDs and 7-Segment display
--------------------------------------------------------------------------------
LIBRARY IEEE;
USE IEEE.STD_LOGIC_1164.ALL;
ENTITY DispAlu4_tb IS
END DispAlu4_tb;
ARCHITECTURE simulate OF DispAlu4_tb IS
 COMPONENT DispAlu4
 port(
 a: IN STD_LOGIC_VECTOR(3 DOWNTO 0); -- Input SW[7..4]: a[3..0]
 b: IN STD_LOGIC_VECTOR(3 DOWNTO 0); -- Input SW[3..0]: b[3..0]
 control: IN STD_LOGIC_VECTOR(1 DOWNTO 0); -- Input SW[15..14]: control[1..0]
 led15: OUT STD_LOGIC; -- Output LED[15]: overflow
 led17: OUT STD_LOGIC; -- Output LED[17]: zero
 led16: OUT STD_LOGIC; -- Output LED[16]: carryOut
 an: OUT STD_LOGIC_VECTOR(7 DOWNTO 0); -- Output AN[7..0]: '0' enabled
 hex: OUT STD_LOGIC_VECTOR(6 DOWNTO 0) -- Output HEX[6..0]: result[3..0]
 );
 END COMPONENT;

 SIGNAL a: STD_LOGIC_VECTOR(3 DOWNTO 0);
 SIGNAL b: STD_LOGIC_VECTOR(3 DOWNTO 0);
 SIGNAL control: STD_LOGIC_VECTOR(1 DOWNTO 0);
 SIGNAL led15: STD_LOGIC;
 SIGNAL led17: STD_LOGIC;
 SIGNAL led16: STD_LOGIC;
 SIGNAL an: STD_LOGIC_VECTOR(7 DOWNTO 0);
 SIGNAL hex: STD_LOGIC_VECTOR(6 DOWNTO 0);
BEGIN
 uut: DispAlu4 PORT MAP(
 a, b, control,
 led15, led17, led16, an, hex);

 stimulus: PROCESS
 BEGIN
 -- test bench stimulus code
 -- "0000" AND "0000": overflow<='0', zero<='1', carryOut<='0', result<="0000"
 a <= "0000"; b <= "0000"; control <= "00";
 WAIT FOR 40 ns;
 -- "0111" AND "0001": overflow<='0', zero<='0', carryOut<='0', result<="0001"
 a <= "0111"; b <= "0001"; control <= "00";
 WAIT FOR 40 ns;
 -- "0111" AND "1111": overflow<='0', zero<='0', carryOut<='0', result<="0111"
 a <= "0111"; b <= "1111"; control <= "00";
 WAIT FOR 40 ns;
 -- "1111" AND "0111": overflow<='0', zero<='0', carryOut<='0', result<="0111"
 a <= "1111"; b <= "0111"; control <= "00";
 WAIT FOR 40 ns;
 -- "1000" AND "0001": overflow<='0', zero<='1', carryOut<='0', result<="0000"
 a <= "1000"; b <= "0001"; control <= "00";
 WAIT FOR 40 ns;
 -- "1000" AND "1111": overflow<='0', zero<='0', carryOut<='0', result<="1000"
 a <= "1000"; b <= "1111"; control <= "00";
 WAIT FOR 40 ns;
 -- "0000" OR "0000": overflow<='0', zero<='1', carryOut<='0', result<="0000"
 a <= "0000"; b <= "0000"; control <= "01";
 WAIT FOR 40 ns;
 -- "0111" OR "0001": overflow<='0', zero<='0', carryOut<='0', result<="0111"
 a <= "0111"; b <= "0001"; control <= "01";
 WAIT FOR 40 ns;
 -- "0111" OR "1111": overflow<='0', zero<='0', carryOut<='0', result<="1111"
 a <= "0111"; b <= "1111"; control <= "01";
 WAIT FOR 40 ns;
 -- "1111" OR "0111": overflow<='0', zero<='0', carryOut<='0', result<="1111"
 a <= "1111"; b <= "0111"; control <= "01";
 WAIT FOR 40 ns;
 -- "1000" OR "0001": overflow<='0', zero<='0', carryOut<='0', result<="1001"
 a <= "1000"; b <= "0001"; control <= "01";
 WAIT FOR 40 ns;
 -- "1000" OR "1111": overflow<='0', zero<='0', carryOut<='0', result<="1111"
 a <= "1000"; b <= "1111"; control <= "01";
 WAIT FOR 40 ns;

 -- "0000" ADD "0000": overflow<='0', zero<='1', carryOut<='0', result<="0000"
 a <= "0000"; b <= "0000"; control <= "10";
 WAIT FOR 40 ns;
 -- "0111" ADD "0001": overflow<='1', zero<='0', carryOut<='0', result<="1000"
 a <= "0111"; b <= "0001"; control <= "10";
 WAIT FOR 40 ns;
 -- "0111" ADD "1111": overflow<='0', zero<='0', carryOut<='1', result<="0110"
 a <= "0111"; b <= "1111"; control <= "10";
 WAIT FOR 40 ns;
 -- "1111" ADD "0111": overflow<='0', zero<='0', carryOut<='1', result<="0110"
 a <= "1111"; b <= "0111"; control <= "10";
 WAIT FOR 40 ns;
 -- "1000" ADD "0001": overflow<='0', zero<='0', carryOut<='0', result<="1001"
 a <= "1000"; b <= "0001"; control <= "10";
 WAIT FOR 40 ns;
 -- "1000" ADD "1111": overflow<='1', zero<='0', carryOut<='1', result<="0111"
 a <= "1000"; b <= "1111"; control <= "10";
 WAIT FOR 40 ns;

 -- "0000" SUB "0000": overflow<='0', zero<='1', carryOut<='1', result<="0000"
 a <= "0000"; b <= "0000"; control <= "11";
 WAIT FOR 40 ns;
 -- "0111" SUB "0001": overflow<='0', zero<='0', carryOut<='1', result<="0110"
 a <= "0111"; b <= "0001"; control <= "11";
 WAIT FOR 40 ns;
 -- "0111" SUB "1111": overflow<='1', zero<='0', carryOut<='0', result<="1000"
 a <= "0111"; b <= "1111"; control <= "11";
 WAIT FOR 40 ns;
 -- "1111" SUB "0111": overflow<='0', zero<='0', carryOut<='1', result<="1000"
 a <= "1111"; b <= "0111"; control <= "11";
 WAIT FOR 40 ns;
 -- "1000" SUB "0001": overflow<='1', zero<='0', carryOut<='1', result<="0111"
 a <= "1000"; b <= "0001"; control <= "11";
 WAIT FOR 40 ns;
 -- "1000" SUB "1111": overflow<='0', zero<='0', carryOut<='0', result<="1001"
 a <= "1000"; b <= "1111"; control <= "11";
 WAIT FOR 40 ns;

 WAIT;
 END PROCESS;
END simulate;