LIBRARY IEEE;
USE IEEE.STD_LOGIC_1164.ALL;
ENTITY Alu1 IS
PORT(
a, b: IN STD_LOGIC;
 carryIn: IN STD_LOGIC;
 control: IN STD_LOGIC_VECTOR(1 DOWNTO 0);
carryOut: OUT STD_LOGIC;
result: OUT STD_LOGIC
 );
END Alu1;
ARCHITECTURE behavioral OF Alu1 IS
 COMPONENT adder1
 PORT (
 a, b, cIn : IN std_logic;
 cOut, sum : OUT std_logic);
 END COMPONENT;
 SIGNAL a_sig, b_sig: STD_LOGIC;
 SIGNAL sum_sig, carryOut_sig: STD_LOGIC;
 SIGNAL result_sig: STD_LOGIC;
BEGIN

 a_sig <= a;
 b_sig <= NOT b WHEN control = "11" ELSE -- SUBTRACT (1's complement)
 b;
 co: adder1 PORT MAP(a_sig, b_sig, carryIn, carryOut_sig, sum_sig);

 -- ADD and SUBTRACT operations do the same thing (ADD)
 WITH control SELECT
 result_sig <=
 a AND b WHEN "00", -- AND
 a OR b WHEN "01", -- OR
 sum_sig WHEN "10", -- ADD
 sum_sig WHEN "11", -- SUBTRACT
 sum_sig WHEN Others;
 result <= result_sig;
 -- carryOut = '0' when AND or OR operations
 carryOut <= '0' WHEN control = "00" OR control = "01" ELSE
 carryOut_sig;
END behavioral;