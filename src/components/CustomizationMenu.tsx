"use client";

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import GameCharacter, { ApronSet } from './GameCharacter';
import { Settings2, X, ChevronDown, ChevronRight } from 'lucide-react';

// Import all apron assets (Idle)
import yellowIdle from '@/assets/aprons/idle/yellow.png';
import blackIdle from '@/assets/aprons/idle/black.png';
import blueIdle from '@/assets/aprons/idle/blue.png';
import bluegrayIdle from '@/assets/aprons/idle/bluegray.png';
import brownIdle from '@/assets/aprons/idle/brown.png';
import charcoalIdle from '@/assets/aprons/idle/charcoal.png';
import forestIdle from '@/assets/aprons/idle/forest.png';
import grayIdle from '@/assets/aprons/idle/gray.png';
import greenIdle from '@/assets/aprons/idle/green.png';
import lavenderIdle from '@/assets/aprons/idle/lavender.png';
import leatherIdle from '@/assets/aprons/idle/leather.png';
import maroonIdle from '@/assets/aprons/idle/maroon.png';
import navyIdle from '@/assets/aprons/idle/navy.png';
import orangeIdle from '@/assets/aprons/idle/orange.png';
import pinkIdle from '@/assets/aprons/idle/pink.png';
import purpleIdle from '@/assets/aprons/idle/purple.png';
import redIdle from '@/assets/aprons/idle/red.png';
import roseIdle from '@/assets/aprons/idle/rose.png';
import skyIdle from '@/assets/aprons/idle/sky.png';
import slateIdle from '@/assets/aprons/idle/slate.png';
import tanIdle from '@/assets/aprons/idle/tan.png';
import tealIdle from '@/assets/aprons/idle/teal.png';
import walnutIdle from '@/assets/aprons/idle/walnut.png';
import whiteIdle from '@/assets/aprons/idle/white.png';

// Import all apron assets (Walk)
import yellowWalk from '@/assets/aprons/walk/yellow.png';
import blackWalk from '@/assets/aprons/walk/black.png';
import blueWalk from '@/assets/aprons/walk/blue.png';
import bluegrayWalk from '@/assets/aprons/walk/bluegray.png';
import brownWalk from '@/assets/aprons/walk/brown.png';
import charcoalWalk from '@/assets/aprons/walk/charcoal.png';
import forestWalk from '@/assets/aprons/walk/forest.png';
import grayWalk from '@/assets/aprons/walk/gray.png';
import greenWalk from '@/assets/aprons/walk/green.png';
import lavenderWalk from '@/assets/aprons/walk/lavender.png';
import leatherWalk from '@/assets/aprons/walk/leather.png';
import maroonWalk from '@/assets/aprons/walk/maroon.png';
import navyWalk from '@/assets/aprons/walk/navy.png';
import orangeWalk from '@/assets/aprons/walk/orange.png';
import pinkWalk from '@/assets/aprons/walk/pink.png';
import purpleWalk from '@/assets/aprons/walk/purple.png';
import redWalk from '@/assets/aprons/walk/red.png';
import roseWalk from '@/assets/aprons/walk/rose.png';
import skyWalk from '@/assets/aprons/walk/sky.png';
import slateWalk from '@/assets/aprons/walk/slate.png';
import tanWalk from '@/assets/aprons/walk/tan.png';
import tealWalk from '@/assets/aprons/walk/teal.png';
import walnutWalk from '@/assets/aprons/walk/walnut.png';
import whiteWalk from '@/assets/aprons/walk/white.png';

// Import all apron assets (Run)
import yellowRun from '@/assets/aprons/run/yellow.png';
import blackRun from '@/assets/aprons/run/black.png';
import blueRun from '@/assets/aprons/run/blue.png';
import bluegrayRun from '@/assets/aprons/run/bluegray.png';
import brownRun from '@/assets/aprons/run/brown.png';
import charcoalRun from '@/assets/aprons/run/charcoal.png';
import forestRun from '@/assets/aprons/run/forest.png';
import grayRun from '@/assets/aprons/run/gray.png';
import greenRun from '@/assets/aprons/run/green.png';
import lavenderRun from '@/assets/aprons/run/lavender.png';
import leatherRun from '@/assets/aprons/run/leather.png';
import maroonRun from '@/assets/aprons/run/maroon.png';
import navyRun from '@/assets/aprons/run/navy.png';
import orangeRun from '@/assets/aprons/run/orange.png';
import pinkRun from '@/assets/aprons/run/pink.png';
import purpleRun from '@/assets/aprons/run/purple.png';
import redRun from '@/assets/aprons/run/red.png';
import roseRun from '@/assets/aprons/run/rose.png';
import skyRun from '@/assets/aprons/run/sky.png';
import slateRun from '@/assets/aprons/run/slate.png';
import tanRun from '@/assets/aprons/run/tan.png';
import tealRun from '@/assets/aprons/run/teal.png';
import walnutRun from '@/assets/aprons/run/walnut.png';
import whiteRun from '@/assets/aprons/run/white.png';

// Import all apron assets (Backlash)
import yellowBacklash from '@/assets/aprons/backlash/yellow.png';
import blackBacklash from '@/assets/aprons/backlash/black.png';
import blueBacklash from '@/assets/aprons/backlash/blue.png';
import bluegrayBacklash from '@/assets/aprons/backlash/bluegray.png';
import brownBacklash from '@/assets/aprons/backlash/brown.png';
import charcoalBacklash from '@/assets/aprons/backlash/charcoal.png';
import forestBacklash from '@/assets/aprons/backlash/forest.png';
import grayBacklash from '@/assets/aprons/backlash/gray.png';
import greenBacklash from '@/assets/aprons/backlash/green.png';
import lavenderBacklash from '@/assets/aprons/backlash/lavender.png';
import leatherBacklash from '@/assets/aprons/backlash/leather.png';
import maroonBacklash from '@/assets/aprons/backlash/maroon.png';
import navyBacklash from '@/assets/aprons/backlash/navy.png';
import orangeBacklash from '@/assets/aprons/backlash/orange.png';
import pinkBacklash from '@/assets/aprons/backlash/pink.png';
import purpleBacklash from '@/assets/aprons/backlash/purple.png';
import redBacklash from '@/assets/aprons/backlash/red.png';
import roseBacklash from '@/assets/aprons/backlash/rose.png';
import skyBacklash from '@/assets/aprons/backlash/sky.png';
import slateBacklash from '@/assets/aprons/backlash/slate.png';
import tanBacklash from '@/assets/aprons/backlash/tan.png';
import tealBacklash from '@/assets/aprons/backlash/teal.png';
import walnutBacklash from '@/assets/aprons/backlash/walnut.png';
import whiteBacklash from '@/assets/aprons/backlash/white.png';

// Import all apron assets (Climb)
import yellowClimb from '@/assets/aprons/climb/yellow.png';
import blackClimb from '@/assets/aprons/climb/black.png';
import blueClimb from '@/assets/aprons/climb/blue.png';
import bluegrayClimb from '@/assets/aprons/climb/bluegray.png';
import brownClimb from '@/assets/aprons/climb/brown.png';
import charcoalClimb from '@/assets/aprons/climb/charcoal.png';
import forestClimb from '@/assets/aprons/climb/forest.png';
import grayClimb from '@/assets/aprons/climb/gray.png';
import greenClimb from '@/assets/aprons/climb/green.png';
import lavenderClimb from '@/assets/aprons/climb/lavender.png';
import leatherClimb from '@/assets/aprons/climb/leather.png';
import maroonClimb from '@/assets/aprons/climb/maroon.png';
import navyClimb from '@/assets/aprons/climb/navy.png';
import orangeClimb from '@/assets/aprons/climb/orange.png';
import pinkClimb from '@/assets/aprons/climb/pink.png';
import purpleClimb from '@/assets/aprons/climb/purple.png';
import redClimb from '@/assets/aprons/climb/red.png';
import roseClimb from '@/assets/aprons/climb/rose.png';
import skyClimb from '@/assets/aprons/climb/sky.png';
import slateClimb from '@/assets/aprons/climb/slate.png';
import tanClimb from '@/assets/aprons/climb/tan.png';
import tealClimb from '@/assets/aprons/climb/teal.png';
import walnutClimb from '@/assets/aprons/climb/walnut.png';
import whiteClimb from '@/assets/aprons/climb/white.png';

// Import all apron assets (Combat Idle)
import yellowCombatIdle from '@/assets/aprons/combat_idle/yellow.png';
import blackCombatIdle from '@/assets/aprons/combat_idle/black.png';
import blueCombatIdle from '@/assets/aprons/combat_idle/blue.png';
import bluegrayCombatIdle from '@/assets/aprons/combat_idle/bluegray.png';
import brownCombatIdle from '@/assets/aprons/combat_idle/brown.png';
import charcoalCombatIdle from '@/assets/aprons/combat_idle/charcoal.png';
import forestCombatIdle from '@/assets/aprons/combat_idle/forest.png';
import grayCombatIdle from '@/assets/aprons/combat_idle/gray.png';
import greenCombatIdle from '@/assets/aprons/combat_idle/green.png';
import lavenderCombatIdle from '@/assets/aprons/combat_idle/lavender.png';
import leatherCombatIdle from '@/assets/aprons/combat_idle/leather.png';
import maroonCombatIdle from '@/assets/aprons/combat_idle/maroon.png';
import navyCombatIdle from '@/assets/aprons/combat_idle/navy.png';
import orangeCombatIdle from '@/assets/aprons/combat_idle/orange.png';
import pinkCombatIdle from '@/assets/aprons/combat_idle/pink.png';
import purpleCombatIdle from '@/assets/aprons/combat_idle/purple.png';
import redCombatIdle from '@/assets/aprons/combat_idle/red.png';
import roseCombatIdle from '@/assets/aprons/combat_idle/rose.png';
import skyCombatIdle from '@/assets/aprons/combat_idle/sky.png';
import slateCombatIdle from '@/assets/aprons/combat_idle/slate.png';
import tanCombatIdle from '@/assets/aprons/combat_idle/tan.png';
import tealCombatIdle from '@/assets/aprons/combat_idle/teal.png';
import walnutCombatIdle from '@/assets/aprons/combat_idle/walnut.png';
import whiteCombatIdle from '@/assets/aprons/combat_idle/white.png';

// Import all apron assets (Emote)
import yellowEmote from '@/assets/aprons/emote/yellow.png';
import blackEmote from '@/assets/aprons/emote/black.png';
import blueEmote from '@/assets/aprons/emote/blue.png';
import bluegrayEmote from '@/assets/aprons/emote/bluegray.png';
import brownEmote from '@/assets/aprons/emote/brown.png';
import charcoalEmote from '@/assets/aprons/emote/charcoal.png';
import forestEmote from '@/assets/aprons/emote/forest.png';
import grayEmote from '@/assets/aprons/emote/gray.png';
import greenEmote from '@/assets/aprons/emote/green.png';
import lavenderEmote from '@/assets/aprons/emote/lavender.png';
import leatherEmote from '@/assets/aprons/emote/leather.png';
import maroonEmote from '@/assets/aprons/emote/maroon.png';
import navyEmote from '@/assets/aprons/emote/navy.png';
import orangeEmote from '@/assets/aprons/emote/orange.png';
import pinkEmote from '@/assets/aprons/emote/pink.png';
import purpleEmote from '@/assets/aprons/emote/purple.png';
import redEmote from '@/assets/aprons/emote/red.png';
import roseEmote from '@/assets/aprons/emote/rose.png';
import skyEmote from '@/assets/aprons/emote/sky.png';
import slateEmote from '@/assets/aprons/emote/slate.png';
import tanEmote from '@/assets/aprons/emote/tan.png';
import tealEmote from '@/assets/aprons/emote/teal.png';
import walnutEmote from '@/assets/aprons/emote/walnut.png';
import whiteEmote from '@/assets/aprons/emote/white.png';

// Import all apron assets (Halfslash)
import yellowHalfslash from '@/assets/aprons/halfslash/yellow.png';
import blackHalfslash from '@/assets/aprons/halfslash/black.png';
import blueHalfslash from '@/assets/aprons/halfslash/blue.png';
import bluegrayHalfslash from '@/assets/aprons/halfslash/bluegray.png';
import brownHalfslash from '@/assets/aprons/halfslash/brown.png';
import charcoalHalfslash from '@/assets/aprons/halfslash/charcoal.png';
import forestHalfslash from '@/assets/aprons/halfslash/forest.png';
import grayHalfslash from '@/assets/aprons/halfslash/gray.png';
import greenHalfslash from '@/assets/aprons/halfslash/green.png';
import lavenderHalfslash from '@/assets/aprons/halfslash/lavender.png';
import leatherHalfslash from '@/assets/aprons/halfslash/leather.png';
import maroonHalfslash from '@/assets/aprons/halfslash/maroon.png';
import navyHalfslash from '@/assets/aprons/halfslash/navy.png';
import orangeHalfslash from '@/assets/aprons/halfslash/orange.png';
import pinkHalfslash from '@/assets/aprons/halfslash/pink.png';
import purpleHalfslash from '@/assets/aprons/halfslash/purple.png';
import redHalfslash from '@/assets/aprons/halfslash/red.png';
import roseHalfslash from '@/assets/aprons/halfslash/rose.png';
import skyHalfslash from '@/assets/aprons/halfslash/sky.png';
import slateHalfslash from '@/assets/aprons/halfslash/slate.png';
import tanHalfslash from '@/assets/aprons/halfslash/tan.png';
import tealHalfslash from '@/assets/aprons/halfslash/teal.png';
import walnutHalfslash from '@/assets/aprons/halfslash/walnut.png';
import whiteHalfslash from '@/assets/aprons/halfslash/white.png';

// Import all apron assets (Hurt)
import yellowHurt from '@/assets/aprons/hurt/yellow.png';
import blackHurt from '@/assets/aprons/hurt/black.png';
import blueHurt from '@/assets/aprons/hurt/blue.png';
import bluegrayHurt from '@/assets/aprons/hurt/bluegray.png';
import brownHurt from '@/assets/aprons/hurt/brown.png';
import charcoalHurt from '@/assets/aprons/hurt/charcoal.png';
import forestHurt from '@/assets/aprons/hurt/forest.png';
import grayHurt from '@/assets/aprons/hurt/gray.png';
import greenHurt from '@/assets/aprons/hurt/green.png';
import lavenderHurt from '@/assets/aprons/hurt/lavender.png';
import leatherHurt from '@/assets/aprons/hurt/leather.png';
import maroonHurt from '@/assets/aprons/hurt/maroon.png';
import navyHurt from '@/assets/aprons/hurt/navy.png';
import orangeHurt from '@/assets/aprons/hurt/orange.png';
import pinkHurt from '@/assets/aprons/hurt/pink.png';
import purpleHurt from '@/assets/aprons/hurt/purple.png';
import redHurt from '@/assets/aprons/hurt/red.png';
import roseHurt from '@/assets/aprons/hurt/rose.png';
import skyHurt from '@/assets/aprons/hurt/sky.png';
import slateHurt from '@/assets/aprons/hurt/slate.png';
import tanHurt from '@/assets/aprons/hurt/tan.png';
import tealHurt from '@/assets/aprons/hurt/teal.png';
import walnutHurt from '@/assets/aprons/hurt/walnut.png';
import whiteHurt from '@/assets/aprons/hurt/white.png';

// Import all apron assets (Jump)
import yellowJump from '@/assets/aprons/jump/yellow.png';
import blackJump from '@/assets/aprons/jump/black.png';
import blueJump from '@/assets/aprons/jump/blue.png';
import bluegrayJump from '@/assets/aprons/jump/bluegray.png';
import brownJump from '@/assets/aprons/jump/brown.png';
import charcoalJump from '@/assets/aprons/jump/charcoal.png';
import forestJump from '@/assets/aprons/jump/forest.png';
import grayJump from '@/assets/aprons/jump/gray.png';
import greenJump from '@/assets/aprons/jump/green.png';
import lavenderJump from '@/assets/aprons/jump/lavender.png';
import leatherJump from '@/assets/aprons/jump/leather.png';
import maroonJump from '@/assets/aprons/jump/maroon.png';
import navyJump from '@/assets/aprons/jump/navy.png';
import orangeJump from '@/assets/aprons/jump/orange.png';
import pinkJump from '@/assets/aprons/jump/pink.png';
import purpleJump from '@/assets/aprons/jump/purple.png';
import redJump from '@/assets/aprons/jump/red.png';
import roseJump from '@/assets/aprons/jump/rose.png';
import skyJump from '@/assets/aprons/jump/sky.png';
import slateJump from '@/assets/aprons/jump/slate.png';
import tanJump from '@/assets/aprons/jump/tan.png';
import tealJump from '@/assets/aprons/jump/teal.png';
import walnutJump from '@/assets/aprons/jump/walnut.png';
import whiteJump from '@/assets/aprons/jump/white.png';

// Import all apron assets (Shoot)
import yellowShoot from '@/assets/aprons/shoot/yellow.png';
import blackShoot from '@/assets/aprons/shoot/black.png';
import blueShoot from '@/assets/aprons/shoot/blue.png';
import bluegrayShoot from '@/assets/aprons/shoot/bluegray.png';
import brownShoot from '@/assets/aprons/shoot/brown.png';
import charcoalShoot from '@/assets/aprons/shoot/charcoal.png';
import forestShoot from '@/assets/aprons/shoot/forest.png';
import grayShoot from '@/assets/aprons/shoot/gray.png';
import greenShoot from '@/assets/aprons/shoot/green.png';
import lavenderShoot from '@/assets/aprons/shoot/lavender.png';
import leatherShoot from '@/assets/aprons/shoot/leather.png';
import maroonShoot from '@/assets/aprons/shoot/maroon.png';
import navyShoot from '@/assets/aprons/shoot/navy.png';
import orangeShoot from '@/assets/aprons/shoot/orange.png';
import pinkShoot from '@/assets/aprons/shoot/pink.png';
import purpleShoot from '@/assets/aprons/shoot/purple.png';
import redShoot from '@/assets/aprons/shoot/red.png';
import roseShoot from '@/assets/aprons/shoot/rose.png';
import skyShoot from '@/assets/aprons/shoot/sky.png';
import slateShoot from '@/assets/aprons/shoot/slate.png';
import tanShoot from '@/assets/aprons/shoot/tan.png';
import tealShoot from '@/assets/aprons/shoot/teal.png';
import walnutShoot from '@/assets/aprons/shoot/walnut.png';
import whiteShoot from '@/assets/aprons/shoot/white.png';

// Import all apron assets (Sit)
import yellowSit from '@/assets/aprons/sit/yellow.png';
import blackSit from '@/assets/aprons/sit/black.png';
import blueSit from '@/assets/aprons/sit/blue.png';
import bluegraySit from '@/assets/aprons/sit/bluegray.png';
import brownSit from '@/assets/aprons/sit/brown.png';
import charcoalSit from '@/assets/aprons/sit/charcoal.png';
import forestSit from '@/assets/aprons/sit/forest.png';
import graySit from '@/assets/aprons/sit/gray.png';
import greenSit from '@/assets/aprons/sit/green.png';
import lavenderSit from '@/assets/aprons/sit/lavender.png';
import leatherSit from '@/assets/aprons/sit/leather.png';
import maroonSit from '@/assets/aprons/sit/maroon.png';
import navySit from '@/assets/aprons/sit/navy.png';
import orangeSit from '@/assets/aprons/sit/orange.png';
import pinkSit from '@/assets/aprons/sit/pink.png';
import purpleSit from '@/assets/aprons/sit/purple.png';
import redSit from '@/assets/aprons/sit/red.png';
import roseSit from '@/assets/aprons/sit/rose.png';
import skySit from '@/assets/aprons/sit/sky.png';
import slateSit from '@/assets/aprons/sit/slate.png';
import tanSit from '@/assets/aprons/sit/tan.png';
import tealSit from '@/assets/aprons/sit/teal.png';
import walnutSit from '@/assets/aprons/sit/walnut.png';
import whiteSit from '@/assets/aprons/sit/white.png';

const PREVIEW_OFFSETS = {
  CLOTHES_FRONT: '0px -128px',
  SPRITE_SIZE: '128px 256px'
};

const APRONS: { name: string; set: ApronSet }[] = [
  { name: 'Yellow', set: { idle: yellowIdle, walk: yellowWalk, run: yellowRun, backlash: yellowBacklash, climb: yellowClimb, combat_idle: yellowCombatIdle, emote: yellowEmote, halfslash: yellowHalfslash, hurt: yellowHurt, jump: yellowJump, shoot: yellowShoot, sit: yellowSit } },
  { name: 'Black', set: { idle: blackIdle, walk: blackWalk, run: blackRun, backlash: blackBacklash, climb: blackClimb, combat_idle: blackCombatIdle, emote: blackEmote, halfslash: blackHalfslash, hurt: blackHurt, jump: blackJump, shoot: blackShoot, sit: blackSit } },
  { name: 'Blue', set: { idle: blueIdle, walk: blueWalk, run: blueRun, backlash: blueBacklash, climb: blueClimb, combat_idle: blueCombatIdle, emote: blueEmote, halfslash: blueHalfslash, hurt: blueHurt, jump: blueJump, shoot: blueShoot, sit: blueSit } },
  { name: 'Blue Gray', set: { idle: bluegrayIdle, walk: bluegrayWalk, run: bluegrayRun, backlash: bluegrayBacklash, climb: bluegrayClimb, combat_idle: bluegrayCombatIdle, emote: bluegrayEmote, halfslash: bluegrayHalfslash, hurt: bluegrayHurt, jump: bluegrayJump, shoot: bluegrayShoot, sit: bluegraySit } },
  { name: 'Brown', set: { idle: brownIdle, walk: brownWalk, run: brownRun, backlash: brownBacklash, climb: brownClimb, combat_idle: brownCombatIdle, emote: brownEmote, halfslash: brownHalfslash, hurt: brownHurt, jump: brownJump, shoot: brownShoot, sit: brownSit } },
  { name: 'Charcoal', set: { idle: charcoalIdle, walk: charcoalWalk, run: charcoalRun, backlash: charcoalBacklash, climb: charcoalClimb, combat_idle: charcoalCombatIdle, emote: charcoalEmote, halfslash: charcoalHalfslash, hurt: charcoalHurt, jump: charcoalJump, shoot: charcoalShoot, sit: charcoalSit } },
  { name: 'Forest', set: { idle: forestIdle, walk: forestWalk, run: forestRun, backlash: forestBacklash, climb: forestClimb, combat_idle: forestCombatIdle, emote: forestEmote, halfslash: forestHalfslash, hurt: forestHurt, jump: forestJump, shoot: forestShoot, sit: forestSit } },
  { name: 'Gray', set: { idle: grayIdle, walk: grayWalk, run: grayRun, backlash: grayBacklash, climb: grayClimb, combat_idle: grayCombatIdle, emote: grayEmote, halfslash: grayHalfslash, hurt: grayHurt, jump: grayJump, shoot: grayShoot, sit: graySit } },
  { name: 'Green', set: { idle: greenIdle, walk: greenWalk, run: greenRun, backlash: greenBacklash, climb: greenClimb, combat_idle: greenCombatIdle, emote: greenEmote, halfslash: greenHalfslash, hurt: greenHurt, jump: greenJump, shoot: greenShoot, sit: greenSit } },
  { name: 'Lavender', set: { idle: lavenderIdle, walk: lavenderWalk, run: lavenderRun, backlash: lavenderBacklash, climb: lavenderClimb, combat_idle: lavenderCombatIdle, emote: lavenderEmote, halfslash: lavenderHalfslash, hurt: lavenderHurt, jump: lavenderJump, shoot: lavenderShoot, sit: lavenderSit } },
  { name: 'Leather', set: { idle: leatherIdle, walk: leatherWalk, run: leatherRun, backlash: leatherBacklash, climb: leatherClimb, combat_idle: leatherCombatIdle, emote: leatherEmote, halfslash: leatherHalfslash, hurt: leatherHurt, jump: leatherJump, shoot: leatherShoot, sit: leatherSit } },
  { name: 'Maroon', set: { idle: maroonIdle, walk: maroonWalk, run: maroonRun, backlash: maroonBacklash, climb: maroonClimb, combat_idle: maroonCombatIdle, emote: maroonEmote, halfslash: maroonHalfslash, hurt: maroonHurt, jump: maroonJump, shoot: maroonShoot, sit: maroonSit } },
  { name: 'Navy', set: { idle: navyIdle, walk: navyWalk, run: navyRun, backlash: navyBacklash, climb: navyClimb, combat_idle: navyCombatIdle, emote: navyEmote, halfslash: navyHalfslash, hurt: navyHurt, jump: navyJump, shoot: navyShoot, sit: navySit } },
  { name: 'Orange', set: { idle: orangeIdle, walk: orangeWalk, run: orangeRun, backlash: orangeBacklash, climb: orangeClimb, combat_idle: orangeCombatIdle, emote: orangeEmote, halfslash: orangeHalfslash, hurt: orangeHurt, jump: orangeJump, shoot: orangeShoot, sit: orangeSit } },
  { name: 'Pink', set: { idle: pinkIdle, walk: pinkWalk, run: pinkRun, backlash: pinkBacklash, climb: pinkClimb, combat_idle: pinkCombatIdle, emote: pinkEmote, halfslash: pinkHalfslash, hurt: pinkHurt, jump: pinkJump, shoot: pinkShoot, sit: pinkSit } },
  { name: 'Purple', set: { idle: purpleIdle, walk: purpleWalk, run: purpleRun, backlash: purpleBacklash, climb: purpleClimb, combat_idle: purpleCombatIdle, emote: purpleEmote, halfslash: purpleHalfslash, hurt: purpleHurt, jump: purpleJump, shoot: purpleShoot, sit: purpleSit } },
  { name: 'Red', set: { idle: redIdle, walk: redWalk, run: redRun, backlash: redBacklash, climb: redClimb, combat_idle: redCombatIdle, emote: redEmote, halfslash: redHalfslash, hurt: redHurt, jump: redJump, shoot: redShoot, sit: redSit } },
  { name: 'Rose', set: { idle: roseIdle, walk: roseWalk, run: roseRun, backlash: roseBacklash, climb: roseClimb, combat_idle: roseCombatIdle, emote: roseEmote, halfslash: roseHalfslash, hurt: roseHurt, jump: roseJump, shoot: roseShoot, sit: roseSit } },
  { name: 'Sky', set: { idle: skyIdle, walk: skyWalk, run: skyRun, backlash: skyBacklash, climb: skyClimb, combat_idle: skyCombatIdle, emote: skyEmote, halfslash: skyHalfslash, hurt: skyHurt, jump: skyJump, shoot: skyShoot, sit: skySit } },
  { name: 'Slate', set: { idle: slateIdle, walk: slateWalk, run: slateRun, backlash: slateBacklash, climb: slateClimb, combat_idle: slateCombatIdle, emote: slateEmote, halfslash: slateHalfslash, hurt: slateHurt, jump: slateJump, shoot: slateShoot, sit: slateSit } },
  { name: 'Tan', set: { idle: tanIdle, walk: tanWalk, run: tanRun, backlash: tanBacklash, climb: tanClimb, combat_idle: tanCombatIdle, emote: tanEmote, halfslash: tanHalfslash, hurt: tanHurt, jump: tanJump, shoot: tanShoot, sit: tanSit } },
  { name: 'Teal', set: { idle: tealIdle, walk: tealWalk, run: tealRun, backlash: tealBacklash, climb: tealClimb, combat_idle: tealCombatIdle, emote: tealEmote, halfslash: tealHalfslash, hurt: tealHurt, jump: tealJump, shoot: tealShoot, sit: tealSit } },
  { name: 'Walnut', set: { idle: walnutIdle, walk: walnutWalk, run: walnutRun, backlash: walnutBacklash, climb: walnutClimb, combat_idle: walnutCombatIdle, emote: walnutEmote, halfslash: walnutHalfslash, hurt: walnutHurt, jump: walnutJump, shoot: walnutShoot, sit: walnutSit } },
  { name: 'White', set: { idle: whiteIdle, walk: whiteWalk, run: whiteRun, backlash: whiteBacklash, climb: whiteClimb, combat_idle: whiteCombatIdle, emote: whiteEmote, halfslash: whiteHalfslash, hurt: whiteHurt, jump: whiteJump, shoot: whiteShoot, sit: whiteSit } },
];

interface CustomizationMenuProps {
  selectedApron: ApronSet | null;
  onSelectApron: (set: ApronSet | null) => void;
}

const CustomizationMenu: React.FC<CustomizationMenuProps> = ({ selectedApron, onSelectApron }) => {
  const [isClothesOpen, setIsClothesOpen] = useState(true);
  const [isApronsOpen, setIsApronsOpen] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          className="fixed left-6 top-6 z-50 h-auto py-3 px-6 rounded-none border-b-4 border-r-4 border-stone-800 bg-stone-200 hover:bg-stone-300 active:border-b-0 active:border-r-0 active:translate-x-[2px] active:translate-y-[2px] transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
          style={{ fontFamily: "'VT323', monospace" }}
        >
          <Settings2 className="mr-2 h-5 w-5 text-stone-700" />
          <span className="text-2xl tracking-wider text-stone-800 uppercase">
            Customization
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[1000px] w-[90vw] h-[80vh] min-h-[80vh] max-h-[80vh] p-0 overflow-hidden bg-stone-100 border-4 border-stone-800 rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)]">
        <div className="flex h-full w-full gap-8 p-8 overflow-hidden">
          <div className="w-[400px] h-full flex-none flex flex-col bg-stone-200/50 border-4 border-stone-800 p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] overflow-hidden">
            <div className="space-y-2 mb-6 flex-none">
              <h2 className="text-4xl text-stone-900 uppercase tracking-wider" style={{ fontFamily: "'VT323', monospace" }}>Inventory</h2>
              <div className="h-1 w-full bg-stone-800" />
            </div>

            <ScrollArea className="flex-1 pr-2">
              <div className="space-y-3">
                <button
                  onClick={() => setIsClothesOpen(!isClothesOpen)}
                  className={`w-full flex items-center justify-between p-3 border-2 border-stone-800 transition-colors ${isClothesOpen ? 'bg-stone-800 text-stone-100' : 'bg-stone-300 text-stone-800 hover:bg-stone-400'}`}
                  style={{ fontFamily: "'VT323', monospace" }}
                >
                  <span className="text-2xl uppercase tracking-tight">Clothes</span>
                  {isClothesOpen ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
                </button>

                {isClothesOpen && (
                  <div className="pl-4 space-y-2">
                    <button
                      onClick={() => setIsApronsOpen(!isApronsOpen)}
                      className={`w-full flex items-center justify-between p-2 border-2 border-stone-800 transition-colors ${isApronsOpen ? 'bg-stone-400 text-stone-900' : 'bg-stone-200 text-stone-700 hover:bg-stone-300'}`}
                      style={{ fontFamily: "'VT323', monospace" }}
                    >
                      <span className="text-xl uppercase">Aprons</span>
                      {isApronsOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </button>

                    {isApronsOpen && (
                      <div className="grid grid-cols-3 gap-y-8 gap-x-2 py-6">
                        <button
                          onClick={() => onSelectApron(null)}
                          className="flex flex-col items-center gap-2 group"
                          style={{ fontFamily: "'VT323', monospace" }}
                        >
                          <div className={`w-16 h-16 flex items-center justify-center transition-all rounded-lg ${!selectedApron ? 'bg-stone-800/10 ring-2 ring-stone-800' : 'group-hover:bg-stone-800/5'}`}>
                            <X size={32} className={`${!selectedApron ? 'text-stone-900' : 'text-stone-400'}`} />
                          </div>
                          <span className={`text-sm uppercase tracking-tighter ${!selectedApron ? 'text-stone-900 font-bold' : 'text-stone-500'}`}>None</span>
                        </button>

                        {APRONS.map((apron) => (
                          <button
                            key={apron.name}
                            onClick={() => onSelectApron(apron.set)}
                            className="flex flex-col items-center gap-2 group"
                            style={{ fontFamily: "'VT323', monospace" }}
                          >
                            <div className={`w-16 h-16 transition-all flex items-center justify-center rounded-lg ${selectedApron === apron.set ? 'bg-stone-800/10 ring-2 ring-stone-800 scale-110' : 'group-hover:bg-stone-800/5'}`}>
                              <div 
                                className="w-16 h-16"
                                style={{ 
                                  backgroundImage: `url(${apron.set.idle})`,
                                  backgroundPosition: PREVIEW_OFFSETS.CLOTHES_FRONT,
                                  backgroundSize: PREVIEW_OFFSETS.SPRITE_SIZE,
                                  imageRendering: 'pixelated'
                                }}
                              />
                            </div>
                            <span className={`text-sm uppercase tracking-tighter text-center leading-none ${selectedApron === apron.set ? 'text-stone-900 font-bold' : 'text-stone-500'}`}>
                              {apron.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          <div className="flex-1 h-full relative bg-stone-200/30 border-4 border-stone-800/10 rounded-xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="scale-[6] transform-gpu">
                  <GameCharacter 
                    position={{ x: -32, y: -32 }} 
                    direction="down"
                    action="idle"
                    apron={selectedApron}
                    noTransition={true}
                  />
                </div>
              </div>
            </div>
            <div className="absolute bottom-8 left-0 right-0 text-center text-stone-800/40 tracking-widest uppercase text-2xl pointer-events-none" style={{ fontFamily: "'VT323', monospace" }}>
              Character Preview
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomizationMenu;