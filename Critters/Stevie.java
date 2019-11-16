/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author s790220
 */
import java.awt.Color;
import java.util.*;

public class Stevie extends Critter {
    public static List<Stevie> list= new  ArrayList<>();
    int move=0;
    private boolean camp = false;
    public Stevie(){
        list.add(this);
    }
    @Override
    public Action getMove(CritterInfo info) {
            move++;
        if (info.getLeft() == Neighbor.SAME || info.getRight() == Neighbor.SAME || info.getFront() == Neighbor.SAME || info.getBack() == Neighbor.SAME) {
            camp = true;
        }
        if (!(info.getLeft() == Neighbor.SAME || info.getRight() == Neighbor.SAME || info.getFront() == Neighbor.SAME || info.getBack() == Neighbor.SAME)) {
            camp = false;
        }
        if (camp) {

            if (info.getFront() == Neighbor.OTHER) {
                return Action.INFECT;
            }
            if (info.getBack() == Neighbor.OTHER || info.getBack() == Neighbor.EMPTY) {
                return Action.LEFT;
            }
            if (info.getLeft() == Neighbor.WALL && info.getBack() == Neighbor.SAME && (info.getFront() == Neighbor.EMPTY || info.getFront() == Neighbor.OTHER)) {
                return Action.INFECT;
            }
            if (info.getRight() == Neighbor.WALL && info.getBack() == Neighbor.SAME && (info.getFront() == Neighbor.EMPTY || info.getFront() == Neighbor.OTHER)) {
                return Action.INFECT;
            }
            if (info.getRight() == Neighbor.EMPTY || info.getRight() == Neighbor.OTHER) {
                return Action.RIGHT;
            }
            if (info.getLeft() == Neighbor.EMPTY || info.getLeft() == Neighbor.OTHER) {
                return Action.LEFT;
            }
            return Action.INFECT;
        } else {
            if (info.getFront() == Neighbor.OTHER) {
                return Action.INFECT;
            }
            if (info.getDirection() == Direction.EAST && info.getRight() != Neighbor.WALL) {
                return Action.RIGHT;
            }
            if (info.getDirection() == Direction.WEST) {
                return Action.LEFT;
            }
            if (info.getDirection() == Direction.NORTH) {
                return Action.RIGHT;
            }
            if (info.getFront() == Neighbor.WALL) {
                return Action.LEFT;
            }
            if (info.getLeft() == Neighbor.OTHER) {
                return Action.HOP;
            }
            if (info.getRight() == Neighbor.OTHER) {
                return Action.HOP;
            }

            if (info.getBack() == Neighbor.OTHER) {
                return Action.HOP;
            }

            if (info.getFront() == Neighbor.EMPTY) {
                return Action.HOP;
            }

            return Action.INFECT;
        }
    }

    @Override
    public Color getColor() {
        float[] nums = new float[3];
        Color.RGBtoHSB((int)Math.round(Math.random()*255), (int)Math.round(Math.random()*255), (int)Math.round(Math.random()*255), nums);
        //Color.RGBtoHSB((128), 0, 128, nums);
        return Color.getHSBColor(nums[0], nums[1], nums[2]);
    }

    @Override
    public String toString() {
        return "S";
    }

}
