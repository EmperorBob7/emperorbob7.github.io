//
//
//

import java.awt.Color;

public class Benjamin extends Critter {

    private Color[] ary;
    private byte moves;
    private Color current;

    public Benjamin() {
        ary = new Color[]{Color.MAGENTA, Color.ORANGE, Color.GREEN, Color.PINK, Color.BLUE, Color.WHITE};
        moves = 0;
    }

    public Color getColor() {
        if (moves % 6 == 0) {
            current = ary[(int) (Math.random() * 6)];
        }
        return current;
    }

    public String toString() {
        return "B";
    }

    public Action getMove(CritterInfo info) {
        moves++;
        if (info.getFront() == Neighbor.OTHER) {
            return Action.INFECT;
        }

        if (info.getLeft() == Neighbor.OTHER) {
            return Action.LEFT;
        }
        if (info.getRight() == Neighbor.OTHER) {
            return Action.RIGHT;
        }
        if (info.getFront() == Neighbor.WALL || info.getFront() == Neighbor.SAME) {
            return Action.LEFT;
        }
        if (info.getBack() == Neighbor.OTHER) {
            return Action.LEFT;
        }

        if (info.getFront() == Neighbor.EMPTY) {
            return Action.HOP;
        }

        return Action.LEFT;
    }
}
