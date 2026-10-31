export interface ProjectCardSlot {
  id: number;
  left: string;
  top: string;
  width: string;
  height: string;
  travelY: number;
}

/**
 * 10 Project card positions matching the reference layout guide:
 * Replaces the old tall portrait layout with landscape cards distributed
 * across the left, center (below heading), and right in a dynamic staggered composition.
 */
export const PROJECT_CARD_SLOTS: ProjectCardSlot[] = [
  // 1. Far-Left Mid
  { id: 1, left: '0.9%', top: '35.3%', width: '16.2%', height: '25.0%', travelY: 70 },
  // 2. Left Top
  { id: 2, left: '6.5%', top: '3.8%', width: '16.8%', height: '27.9%', travelY: 55 },
  // 3. Left Bottom
  { id: 3, left: '9.5%', top: '63.8%', width: '18.2%', height: '24.4%', travelY: 85 },
  // 4. Inner-Left Mid
  { id: 4, left: '19.1%', top: '33.5%', width: '19.4%', height: '27.6%', travelY: 75 },
  // 5. Center (directly below the centered "Our Works" heading)
  { id: 5, left: '39.9%', top: '25.3%', width: '16.8%', height: '29.4%', travelY: 90 },
  // 6. Inner-Right Lower Mid
  { id: 6, left: '57.7%', top: '44.1%', width: '16.0%', height: '23.2%', travelY: 80 },
  // 7. Inner-Right Upper
  { id: 7, left: '66.2%', top: '18.2%', width: '16.4%', height: '22.9%', travelY: 60 },
  // 8. Outer-Right Mid
  { id: 8, left: '75.8%', top: '43.5%', width: '16.8%', height: '23.8%', travelY: 85 },
  // 9. Right Bottom
  { id: 9, left: '79.7%', top: '70.3%', width: '16.4%', height: '25.3%', travelY: 95 },
  // 10. Far-Right Top
  { id: 10, left: '83.9%', top: '11.2%', width: '14.3%', height: '26.5%', travelY: 55 },
];
