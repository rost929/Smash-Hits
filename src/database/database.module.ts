import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../users/user.model';
import { Song } from '../songs/song.model';
import { PlayList } from '../playlists/playlist.model';
import { PlayList_Song } from '../playlist-song/playlist-song.model';
@Module({
    imports: [
        ConfigModule.forRoot(),
        SequelizeModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                const dbConfig = configService.get('config').database;
                return {
                    dialect: 'postgres',
                    host: dbConfig.host,
                    port: dbConfig.port,
                    username: dbConfig.username,
                    password: dbConfig.password,
                    database: dbConfig.name,
                    models: [User, Song, PlayList, PlayList_Song],
                    autoLoadModels: true,
                    synchronize: true,
                };
            },
            inject: [ConfigService],
        }),
    ],
})
export class DatabaseModule { }
