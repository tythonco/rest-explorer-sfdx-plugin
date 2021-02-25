import {join} from 'path';
import {flags, SfdxCommand, core} from '@salesforce/command';

core.Messages.importMessagesDirectory(join(__dirname, '..', '..', '..'));
const messages = core.Messages.loadMessages('rest-explorer', 'org');

export default class Rest extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
    `$ sfdx dtq:rest -u my-org --endpoint '/services/data/v20.0/query/?q=SELECT+name+from+Account'`
  ];

  protected static flagsConfig = {
    file: flags.boolean({char: 'f', description: 'File', required: false}),
    body: flags.string({char: 'b', description: 'Body of request', required: false}),
    endpoint: flags.string({char: 'e', description: 'Endpoint for request', required: true}),
    method: flags.string({char: 'm', description: 'Request method', required: false})
  };

  protected static requiresUsername = true;

  public async run(): Promise<any> { // tslint:disable-line:no-any

    const conn = this.org.getConnection();

    const endpoint = conn.instanceUrl + this.flags.endpoint;
    this.ux.log('Endpoint: ' + this.flags.endpoint);

    const result = await conn.request({
      method: this.flags.method,
      url: endpoint,
    });

    console.dir(result, {depth: null, colors: true})
    return result;
  }
}
