{pervasive, numeric, withIdentity} = require './vhelpers'
{APLArray} = require '../array'

@['⌊'] = withIdentity new APLArray([Infinity], []), pervasive

  # Floor (`⌊`)
  #
  # ⌊123   <=> 123
  # ⌊12.3  <=> 12
  # ⌊¯12.3 <=> ¯13
  # ⌊¯123  <=> ¯123
  # ⌊'a'   !!! DOMAIN ERROR
  # ⌊12j3  !!!
  # ⌊0 5 ¯5 (○1) ¯1.5   <=> 0 5 ¯5 3 ¯2
  monad: numeric Math.floor

  # Lesser of (`⌊`)
  #
  # 3⌊5 <=> 3
  # ⌊/⍬ <=> ¯
  dyad: numeric (y, x) -> Math.min y, x

@['⌈'] = withIdentity new APLArray([-Infinity], []), pervasive

  # Ceiling (`⌈`)
  #
  # ⌈123   <=> 123
  # ⌈12.3  <=> 13
  # ⌈¯12.3 <=> ¯12
  # ⌈¯123  <=> ¯123
  # ⌈'a'   !!! DOMAIN ERROR
  # ⌈12j3  !!!
  # ⌈0 5 ¯5 (○1) ¯1.5 <=> 0 5 ¯5 4 ¯1
  monad: numeric Math.ceil

  # Greater of (`⌈`)
  #
  # 3⌈5 <=> 5
  # ⌈/⍬ <=> ¯¯
  dyad: numeric (y, x) -> Math.max y, x
