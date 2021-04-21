import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateMessages1619016767063 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'messages',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'admin_id',
            type: 'uuid',
            isNullable: true, // an assistant might not join the chat immediatelly (upon user request)
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'text',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          }
        ],
        foreignKeys: [
          {
            name: 'FK_User',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          }
        ]
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('messages');
    }

}
