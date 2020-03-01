import { Injectable, HttpService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PushToken } from './pushtoken.entity';
import { PushTokenRepository } from './pushtoken.repository';
import { ExpoHelper, ExpoMessage } from './expo.helper';
import { User } from 'src/user/user.entity';
import Expo from 'expo-server-sdk';

@Injectable()
export class PushtokenService {
  constructor(
    private readonly expoHelper: ExpoHelper,
    private readonly http: HttpService,
    @InjectRepository(PushToken)
    private readonly pushTokenRepository: PushTokenRepository,
  ) {}

  getAll() {
    return this.pushTokenRepository.getTokens();
  }

  async sendMessage(user: User, body: string, data: {}) {
    const record = await this.pushTokenRepository.findOne({
      where: { username: user.username },
    });

    if (record) {
      const expoMsg = new ExpoMessage(record.token, body, data);
      this.expoHelper.sendMessage(expoMsg);
    } else {
      console.log(`PushToken Not found in db....`);
    }
  }
  async sendMessagesBatch(users: string[], body: string, data: {}) {
    let messages = [];
    for (let user of users) {
      const record = await this.pushTokenRepository.findOne({
        username: user,
      });
      if (record && Expo.isExpoPushToken(record.token)) {
        messages.push({
          to: record.token,
          sound: 'default',
          body: body,
          data: {},
        });
      } else {
        console.error(`Not valid token for ${user}`);
        continue;
      }
    }

    // The Expo push notification service accepts batches of notifications so
    // that you don't need to send 1000 requests to send 1000 notifications. We
    // recommend you batch your notifications to reduce the number of requests
    // and to compress them (notifications with similar content will get
    // compressed).
    let chunks = this.expoHelper.getInstance().chunkPushNotifications(messages);
    let tickets = [];
    (async () => {
      // Send the chunks to the Expo push notification service. There are
      // different strategies you could use. A simple one is to send one chunk at a
      // time, which nicely spreads the load out over time:
      for (let chunk of chunks) {
        try {
          let ticketChunk = await this.expoHelper
            .getInstance()
            .sendPushNotificationsAsync(chunk);
          console.log(ticketChunk);
          tickets.push(...ticketChunk);
          console.log(ticketChunk);
          // NOTE: If a ticket contains an error code in ticket.details.error, you
          // must handle it appropriately. The error codes are listed in the Expo
          // documentation:
          // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
        } catch (error) {
          console.error(error);
        }
      }
    })();
    console.log(tickets);
  }
  async add(user: User, pushToken: string) {
    let record = await this.pushTokenRepository.findOne({
      where: {
        username: user.username,
      },
    });

    if (record && pushToken) {
      record.token = pushToken;
      this.savePushTokenEntity(record);
    }

    if (!record && pushToken) {
      record = new PushToken();
      record.username = user.username;
      record.token = pushToken;
      this.savePushTokenEntity(record);
    }
  }
  private async savePushTokenEntity(entity: PushToken) {
    try {
      await this.pushTokenRepository.save(entity);
      console.log('SUCCESS FULLY PERFORMED TOKEN SAVE OPERATION');
    } catch (err) {
      console.log('Save pushtoken errror');
      console.log(err);
    }
  }

  delete() {
    return this.pushTokenRepository.removeToken();
  }
}
