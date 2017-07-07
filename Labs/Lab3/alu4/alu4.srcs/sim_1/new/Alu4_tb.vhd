--------------------------------------------------------------------------------
LIBRARY IEEE;
USE IEEE.STD_LOGIC_1164.ALL;
ENTITY Alu4_tb IS
END Alu4_tb;
ARCHITECTURE simulate OF Alu4_tb IS
 COMPONENT Alu4
 PORT( a, b: IN STD_LOGIC_VECTOR(3 DOWNTO 0);
 control: IN STD_LOGIC_VECTOR(1 DOWNTO 0);
 overflow: OUT STD_LOGIC;
 zero: OUT STD_LOGIC;
 carryOut: OUT STD_LOGIC;
 result: OUT STD_LOGIC_VECTOR(3 DOWNTO 0)
 );
 END COMPONENT;

 SIGNAL a, b: STD_LOGIC_VECTOR(3 DOWNTO 0);
 SIGNAL control: STD_LOGIC_VECTOR(1 DOWNTO 0);
 SIGNAL overflow: STD_LOGIC;
 SIGNAL zero: STD_LOGIC;
 SIGNAL carryOut: STD_LOGIC;
 SIGNAL result: STD_LOGIC_VECTOR(3 DOWNTO 0);
BEGIN
 uut: Alu4 PORT MAP(
 a, b, control,
 overflow, zero, carryOut, result);

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
