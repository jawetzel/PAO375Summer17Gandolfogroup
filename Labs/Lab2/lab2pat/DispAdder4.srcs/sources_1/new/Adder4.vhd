----------------------------------------------------------------------------------
-- Company: 
-- Engineer: 
-- 
-- Create Date: 06/14/2017 02:35:02 PM
-- Design Name: 
-- Module Name: Adder4 - Behavioral
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


LIBRARY IEEE;
USE IEEE.STD_LOGIC_1164.ALL;

ENTITY Adder4 IS
GENERIC(CONSTANT N: INTEGER := 4);

PORT(
    a: IN STD_LOGIC_VECTOR(N-1 DOWNTO 0); -- Input a[3..0]
    b: IN STD_LOGIC_VECTOR(N-1 DOWNTO 0); -- Input b[3..0]
    cOut: OUT STD_LOGIC; -- Output cCout
    sum: OUT STD_LOGIC_VECTOR(N-1 DOWNTO 0) -- Output sum[3..0]
);

END Adder4;

ARCHITECTURE behavioral OF Adder4 IS
signal out1, out2, out3 :std_logic;

COMPONENT Adder1
    PORT(
    a, b, cIn : IN STD_LOGIC;
    cOut, sum : OUT STD_LOGIC);
END COMPONENT;

SIGNAL carry_sig: STD_LOGIC_VECTOR(N DOWNTO 0);

BEGIN

unit_1: Adder1
PORT MAP( a => a(0),b =>b(0),cIn => '0', cOut => out1, sum => sum(0));

unit_2:Adder1
PORT MAP( a => a(1),b =>b(1),cIn => out1, cOut => out2, sum => sum(1));

unit_3:Adder1
PORT MAP( a => a(2),b =>b(2),cIn => out2, cOut => out3, sum => sum(2));

unit_4:Adder1
PORT MAP( a => a(3),b =>b(3),cIn => out3, cOut => cOut, sum => sum(3));
    
END behavioral;