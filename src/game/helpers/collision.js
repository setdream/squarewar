export const isFreeSpace = (go1, go2) => {
    const v1 = go1.physics.get(PHYSIC_TYPES.KINEMATIC).speed;
    const v2 = go1.physics.get(PHYSIC_TYPES.KINEMATIC).speed;

    const m1 = go1.size.width;
    const m2 = go2.size.width;

    return m1 != m1 ? [
        ((m1 - m2) * v1) / (m1 + m2),
        (2 * m1 * v1) / (m1 + m2)
    ] : [v1, v2];
};