'use strict';

const sequelize = require('../../frameworks_drivers/database/sequelize');
const Admin = require('../entities/admin');

module.exports = class {

    constructor() {
        this.db = sequelize;
        this.model = this.db.model('user');
    }

    async persist(userEntity) {
        const { firstName, lastName, email, password } = userEntity;

        const seqAdmin = await this.model.create({ firstName, lastName, email, password });

        await seqAdmin.save();

        return new Admin(
            seqAdmin.id,
            seqAdmin.firstName,
            seqAdmin.lastName,
            seqAdmin.email,
            seqAdmin.password,
        );
    }

    async merge(userEntity) {
        const seqAdmin = await this.model.findByPk(userEntity.id);

        if (!seqAdmin) return false;

        const { firstName, lastName, email, password } = userEntity;

        await seqAdmin.update({
            firstName,
            lastName,
            email,
            password,
        });

        return new Admin(
            seqAdmin.id,
            seqAdmin.firstName,
            seqAdmin.lastName,
            seqAdmin.email,
            seqAdmin.password,
        );
    }

    async remove(userId) {
        const seqAdmin = await this.model.findByPk(userId);
        if (seqAdmin) {
            return seqAdmin.destroy();
        }
        return false;
    }

    async get(userId) {
        const seqAdmin = await this.model.findByPk(userId);
        return new Admin(
            seqAdmin.id,
            seqAdmin.firstName,
            seqAdmin.lastName,
            seqAdmin.email,
            seqAdmin.password,
        );
    }

    async getByEmail(userEmail) {
        const seqAdmin = await this.model.findOne({ where: { email: userEmail } });
        return new Admin(
            seqAdmin.id,
            seqAdmin.firstName,
            seqAdmin.lastName,
            seqAdmin.email,
            seqAdmin.password,
        );
    }

    async find() {
        const seqAdmins = await this.model.findAll();
        return seqAdmins.map((seqAdmin) => {
            return new Admin(
                seqAdmin.id,
                seqAdmin.firstName,
                seqAdmin.lastName,
                seqAdmin.email,
                seqAdmin.password,
            );
        });
    }
};
