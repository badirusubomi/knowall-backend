import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741939646288 implements MigrationInterface {
    name = 'Migration1741939646288'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "login-activity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "device" character varying, "entity-type" character varying NOT NULL, "entity-id" character varying NOT NULL, "ip-address" character varying, "meta" character varying, CONSTRAINT "PK_0a7a1365e378ead1d6933ddf868" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "admin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "first-name" character varying NOT NULL, "last-name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "organizationId" uuid NOT NULL, CONSTRAINT "UQ_de87485f6489f5d0995f5841952" UNIQUE ("email"), CONSTRAINT "REL_f9067dd27aadb2309dced197e2" UNIQUE ("organizationId"), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chat-session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying, "meta" character varying, "agent" uuid, CONSTRAINT "PK_d3e6d125862913d3da184378f9c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "agent" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "password" character varying NOT NULL, "first-name" character varying NOT NULL, "last-name" character varying NOT NULL, "role" character varying NOT NULL, "created-by" uuid, "organization" uuid NOT NULL, CONSTRAINT "UQ_c8e51500f3876fa1bbd4483ecc1" UNIQUE ("email"), CONSTRAINT "REL_8b3ebbb2a7ff6e96fd7c1ebca0" UNIQUE ("created-by"), CONSTRAINT "PK_1000e989398c5d4ed585cf9a46f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "organization" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "email" character varying NOT NULL, "adminId" uuid, CONSTRAINT "UQ_5d06de67ef6ab02cbd938988bb1" UNIQUE ("email"), CONSTRAINT "REL_ad3465c6feeec7c935a30289b8" UNIQUE ("adminId"), CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "permission" character varying NOT NULL, "slug" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chats" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "timestamp" TIMESTAMP NOT NULL, "meta" character varying NOT NULL, CONSTRAINT "PK_0117647b3c4a4e5ff198aeb6206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "admin" ADD CONSTRAINT "FK_f9067dd27aadb2309dced197e25" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat-session" ADD CONSTRAINT "FK_a72678ac6ccecef0d9800cd6e80" FOREIGN KEY ("agent") REFERENCES "agent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "agent" ADD CONSTRAINT "FK_8b3ebbb2a7ff6e96fd7c1ebca06" FOREIGN KEY ("created-by") REFERENCES "admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "agent" ADD CONSTRAINT "FK_7ff61b6283d657e9067d850e680" FOREIGN KEY ("organization") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "organization" ADD CONSTRAINT "FK_ad3465c6feeec7c935a30289b8c" FOREIGN KEY ("adminId") REFERENCES "admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization" DROP CONSTRAINT "FK_ad3465c6feeec7c935a30289b8c"`);
        await queryRunner.query(`ALTER TABLE "agent" DROP CONSTRAINT "FK_7ff61b6283d657e9067d850e680"`);
        await queryRunner.query(`ALTER TABLE "agent" DROP CONSTRAINT "FK_8b3ebbb2a7ff6e96fd7c1ebca06"`);
        await queryRunner.query(`ALTER TABLE "chat-session" DROP CONSTRAINT "FK_a72678ac6ccecef0d9800cd6e80"`);
        await queryRunner.query(`ALTER TABLE "admin" DROP CONSTRAINT "FK_f9067dd27aadb2309dced197e25"`);
        await queryRunner.query(`DROP TABLE "chats"`);
        await queryRunner.query(`DROP TABLE "permissions"`);
        await queryRunner.query(`DROP TABLE "organization"`);
        await queryRunner.query(`DROP TABLE "agent"`);
        await queryRunner.query(`DROP TABLE "chat-session"`);
        await queryRunner.query(`DROP TABLE "admin"`);
        await queryRunner.query(`DROP TABLE "login-activity"`);
    }

}
