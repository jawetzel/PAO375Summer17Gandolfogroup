LIBRARY IEEE;
USE IEEE.STD_LOGIC_1164.ALL;
ENTITY Alu4 IS
GENERIC(CONSTANT N: INTEGER := 4; -- 4 bits ALU
 CONSTANT Z: STD_LOGIC_VECTOR(3 DOWNTO 1) := "000" -- 3 Zeros
);
PORT(
a, b: IN STD_LOGIC_VECTOR(N-1 DOWNTO 0);
control: IN STD_LOGIC_VECTOR(1 DOWNTO 0);
overflow: OUT STD_LOGIC;
zero: OUT STD_LOGIC;
carryOut: OUT STD_LOGIC;
result: OUT STD_LOGIC_VECTOR(N-1 DOWNTO 0)
 );
END Alu4;
ARCHITECTURE behavioral OF Alu4 IS
COMPONENT Alu1
 PORT(
 a, b: IN STD_LOGIC;
 carryIn: IN STD_LOGIC;
 control: IN STD_LOGIC_VECTOR(1 DOWNTO 0);
 carryOut: OUT STD_LOGIC;
 result: OUT STD_LOGIC
 );
 END COMPONENT;

 SIGNAL carry_sig: STD_LOGIC_VECTOR(N DOWNTO 0); -- carry_sig(N) = MSB carryOut
 SIGNAL result_sig: STD_LOGIC_VECTOR(N-1 DOWNTO 0);
 signal startCin : std_logic;
BEGIN
    startCin <= control(0) and control(1);
    u1: Alu1 port map(a => a(0), b => b(0), carryIn => startCin, control => control, carryOut => carry_sig(0), result => result_sig(0) );
    u2: Alu1 port map(a => a(1), b => b(1), carryIn => carry_sig(0), control => control, carryOut => carry_sig(1), result => result_sig(1) );
    u3: Alu1 port map(a => a(2), b => b(2), carryIn => carry_sig(1), control => control, carryOut => carry_sig(2), result => result_sig(2) );
    u4: Alu1 port map(a => a(3), b => b(3), carryIn => carry_sig(2), control => control, carryOut => carryOut, result => result_sig(3) );

    result <= result_sig;
    
    WITH control SELECT
    overflow <= 
    (not result_sig(3) and a(3) and b(3)) or (result_sig(3) and  not a(3) and not b(3)) when "10",
    (result_sig(3) and a(3) and b(3)) or (not result_sig(3) and a(3) and not b(3)) when "11";

    zero <= (not result_sig(0) and not result_sig(1) and not result_sig(2) and not result_sig(3));
END behavioral;