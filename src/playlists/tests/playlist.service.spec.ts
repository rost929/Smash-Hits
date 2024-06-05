import { Test, TestingModule } from '@nestjs/testing';
import { PlaylistService } from '../services/playlist.service';
import { UserService } from '../../users/services/user.service';
import { UserPlaylistService } from '../../user-playlist/services/user-playlist.service';
import { PlaylistRepository } from '../repository/playlist.repository';
import { Sequelize } from 'sequelize-typescript';
import { CreatePlaylistDto } from '../dtos/CreatePlaylist.dto';
import { UserDto } from 'src/users/dtos/user.dto';
import { PlaylistDto } from 'src/playlists/dtos/Playlist.dto';
import Transaction from 'sequelize/types/transaction';

describe('PlaylistService', () => {
  let service: PlaylistService;
  let userService: UserService;
  let userPlaylistService: UserPlaylistService;
  let playlistRepository: PlaylistRepository;
  let sequelize: Sequelize;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlaylistService,
        {
          provide: UserService,
          useValue: {
            findByEmail: jest.fn(),
          },
        },
        {
          provide: UserPlaylistService,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: PlaylistRepository,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: Sequelize,
          useValue: {
            transaction: jest.fn(() => ({
              commit: jest.fn(),
              rollback: jest.fn(),
            })),
          },
        },
      ],
    }).compile();

    service = module.get<PlaylistService>(PlaylistService);
    userService = module.get<UserService>(UserService);
    userPlaylistService = module.get<UserPlaylistService>(UserPlaylistService);
    playlistRepository = module.get<PlaylistRepository>(PlaylistRepository);
    sequelize = module.get<Sequelize>(Sequelize);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a playlist successfully', async () => {
      const createPlaylistDto: CreatePlaylistDto = {
        emailOwner: 'test@example.com',
        description: 'Test description',
        title: 'Test Playlist',
        isPublic: true,
      };
      const user = {
        id: 1,
        email: 'test@example.com',
        name: 'test name',
        password: 'passwordTest',
      } as UserDto;
      const newPlaylist = {
        id: 1,
        title: 'Test Playlist',
        description: 'Test description',
        isPublic: false,
      } as PlaylistDto;
      const newUserPlaylist = { userId: 1, playlistId: 1 };

      jest.spyOn(userService, 'findByEmail').mockResolvedValue(user);
      jest
        .spyOn(service, 'validateIfPlaylistExistAlready')
        .mockResolvedValue(false);
      jest.spyOn(service, 'buildNewPlaylist').mockReturnValue(newPlaylist);
      jest.spyOn(playlistRepository, 'create').mockResolvedValue(newPlaylist);
      jest
        .spyOn(service, 'buildNewUserPlaylist')
        .mockReturnValue(newUserPlaylist);
      jest
        .spyOn(userPlaylistService, 'create')
        .mockResolvedValue(newUserPlaylist);

      const result = await service.create(createPlaylistDto);

      expect(result).toEqual({
        newPlaylist: newPlaylist,
        message: 'Playlist created successfully',
      });
      expect(userService.findByEmail).toHaveBeenCalledWith('test@example.com');
      expect(service.validateIfPlaylistExistAlready).toHaveBeenCalledWith(
        'Test Playlist',
        1,
      );
      expect(service.buildNewPlaylist).toHaveBeenCalledWith(createPlaylistDto);
      expect(playlistRepository.create).toHaveBeenCalledWith(
        newPlaylist,
        expect.anything(),
      );
      expect(service.buildNewUserPlaylist).toHaveBeenCalledWith(1, 1);
      expect(userPlaylistService.create).toHaveBeenCalledWith(
        newUserPlaylist,
        expect.anything(),
      );
    });

    it('should return an error if the user does not exist', async () => {
      const createPlaylistDto: CreatePlaylistDto = {
        emailOwner: 'test@example.com',
        description: 'description',
        title: 'Test Playlist',
        isPublic: true,
      };

      jest.spyOn(userService, 'findByEmail').mockResolvedValue(null);

      const result = await service.create(createPlaylistDto);

      expect(result).toEqual({
        newPlaylist: null,
        message: 'User does not exist',
        error: true,
      });
      expect(userService.findByEmail).toHaveBeenCalledWith('test@example.com');
    });

    it('should return an error if the playlist already exists for the user', async () => {
      const createPlaylistDto: CreatePlaylistDto = {
        emailOwner: 'test@example.com',
        description: 'Test description',
        title: 'Test Playlist',
        isPublic: true,
      };
      const user = {
        id: 1,
        email: 'test@example.com',
        name: 'test name',
        password: 'passwordTest',
      } as UserDto;

      jest.spyOn(userService, 'findByEmail').mockResolvedValue(user);
      jest
        .spyOn(service, 'validateIfPlaylistExistAlready')
        .mockResolvedValue(true);

      const result = await service.create(createPlaylistDto);

      expect(result).toEqual({
        newPlaylist: null,
        message: `User ${createPlaylistDto.emailOwner} has a ${createPlaylistDto.title} playlist already`,
        error: undefined,
      });
      expect(userService.findByEmail).toHaveBeenCalledWith('test@example.com');
      expect(service.validateIfPlaylistExistAlready).toHaveBeenCalledWith(
        'Test Playlist',
        1,
      );
    });

    it('should return an error if there is an exception during playlist creation', async () => {
      const createPlaylistDto: CreatePlaylistDto = {
        emailOwner: 'test@example.com',
        description: 'Test description',
        title: 'Test Playlist',
        isPublic: true,
      };
      const user = {
        id: 1,
        email: 'test@example.com',
        name: 'test name',
        password: 'passwordTest',
      } as UserDto;

      jest.spyOn(userService, 'findByEmail').mockResolvedValue(user);
      jest
        .spyOn(service, 'validateIfPlaylistExistAlready')
        .mockResolvedValue(false);
      jest.spyOn(service, 'buildNewPlaylist').mockReturnValue({} as any);
      jest
        .spyOn(playlistRepository, 'create')
        .mockRejectedValue(new Error('Create error'));

      const result = await service.create(createPlaylistDto);

      expect(result).toEqual({
        newPlaylist: null,
        message: 'Error when trying to create a new playlist',
        error: true,
      });
      expect(userService.findByEmail).toHaveBeenCalledWith('test@example.com');
      expect(service.validateIfPlaylistExistAlready).toHaveBeenCalledWith(
        'Test Playlist',
        1,
      );
      expect(playlistRepository.create).toHaveBeenCalledWith(
        {},
        expect.anything(),
      );
    });

    it('should return an error if there is an exception during user-playlist creation', async () => {
      const createPlaylistDto: CreatePlaylistDto = {
        emailOwner: 'test@example.com',
        description: 'Test description',
        title: 'Test Playlist',
        isPublic: true,
      };
      const user = {
        id: 1,
        email: 'test@example.com',
        name: 'test name',
        password: 'passwordTest',
      } as UserDto;
      const newPlaylist = {
        id: 1,
        title: 'Test Playlist',
        description: 'Test description',
        isPublic: false,
      } as PlaylistDto;
      const newUserPlaylist = { userId: 1, playlistId: 1 };

      const transaction = {
        commit: jest.fn(),
        rollback: jest.fn(),
      };

      jest
        .spyOn(sequelize, 'transaction')
        .mockResolvedValue(transaction as unknown as Transaction);
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(user);
      jest
        .spyOn(service, 'validateIfPlaylistExistAlready')
        .mockResolvedValue(false);
      jest.spyOn(service, 'buildNewPlaylist').mockReturnValue(newPlaylist);
      jest.spyOn(playlistRepository, 'create').mockResolvedValue(newPlaylist);
      jest
        .spyOn(service, 'buildNewUserPlaylist')
        .mockReturnValue(newUserPlaylist);
      jest
        .spyOn(userPlaylistService, 'create')
        .mockRejectedValue(new Error('User-Playlist create error'));

      const result = await service.create(createPlaylistDto);

      expect(result).toEqual({
        newPlaylist: null,
        message: 'Error when trying to create a new playlist',
        error: true,
      });
      expect(userService.findByEmail).toHaveBeenCalledWith('test@example.com');
      expect(service.validateIfPlaylistExistAlready).toHaveBeenCalledWith(
        'Test Playlist',
        1,
      );
      expect(service.buildNewPlaylist).toHaveBeenCalledWith(createPlaylistDto);
      expect(playlistRepository.create).toHaveBeenCalledWith(
        newPlaylist,
        expect.anything(),
      );
      expect(service.buildNewUserPlaylist).toHaveBeenCalledWith(1, 1);
      expect(userPlaylistService.create).toHaveBeenCalledWith(
        newUserPlaylist,
        expect.anything(),
      );
      expect(transaction.rollback).toHaveBeenCalled();
      expect(transaction.commit).not.toHaveBeenCalled();
    });
  });
});
