export default class Character {
	constructor(classType, hp, speed, defense, dodge, skillPoints, level, shirt, pants, gender) {
		this.classType = classType;
		this.hp = hp;
		this.speed = speed;
		this.defense = defense;
		this.dodge = dodge;
		this.skillPoints = skillPoints;
		this.level = level;
		this.shirt = shirt;
		this.pants = pants;
		this.gender = gender;
	}
}