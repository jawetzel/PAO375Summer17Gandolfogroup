LIBRARY IEEE;
USE IEEE.STD_LOGIC_1164.ALL;
ENTITY DispAlu4 IS
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
END DispAlu4;
ARCHITECTURE behavioral OF DispAlu4 IS
COMPONENT Alu4
PORT(
 a, b: IN STD_LOGIC_VECTOR(3 DOWNTO 0);
 control: IN STD_LOGIC_VECTOR(1 DOWNTO 0);
 overflow: OUT STD_LOGIC;
 zero: OUT STD_LOGIC;
 carryOut : OUT STD_LOGIC;
 result: OUT STD_LOGIC_VECTOR(3 DOWNTO 0)
 );
END COMPONENT;

COMPONENT Bin2Hex
    PORT(
        bin: IN STD_LOGIC_VECTOR(3 DOWNTO 0);
        hex: OUT STD_LOGIC_VECTOR(6 DOWNTO 0)
    );
END COMPONENT;

SIGNAL overflow_sig: STD_LOGIC;
SIGNAL zero_sig: STD_LOGIC;
SIGNAL carry_sig: STD_LOGIC;
SIGNAL result_sig: STD_LOGIC_VECTOR(3 DOWNTO 0);
BEGIN
    u1: Alu4 port map(a => a , b => b, control => control, overflow => overflow_sig,zero => zero_sig, carryOut => carry_sig, result => result_sig);
    u5: Bin2Hex port map(bin => result_sig, hex => hex);
    an <= "11111110";  
    led15 <= overflow_sig;
    led17 <= zero_sig;
    led16 <= carry_sig;
END behavioral;