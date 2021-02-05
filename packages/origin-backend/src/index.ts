import { ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

import { AuthModule } from './auth/auth.module';
import { AdminModule } from './pods/admin/admin.module';
import { Configuration } from './pods/configuration/configuration.entity';
import { ConfigurationModule } from './pods/configuration/configuration.module';
import { EmailConfirmation } from './pods/email-confirmation/email-confirmation.entity';
import { EmailConfirmationModule } from './pods/email-confirmation/email-confirmation.module';
import { File } from './pods/file/file.entity';
import { FileModule } from './pods/file/file.module';
import { Invitation } from './pods/invitation/invitation.entity';
import { InvitationModule } from './pods/invitation/invitation.module';
import { Organization } from './pods/organization/organization.entity';
import { OrganizationModule } from './pods/organization/organization.module';
import { User } from './pods/user/user.entity';
import { UserModule } from './pods/user/user.module';

export { OrganizationModule, OrganizationService } from './pods/organization';

export { AppModule } from './app.module';
export { ConfigurationService } from './pods/configuration/configuration.service';

export * from './pods/organization/events';
export * from './pods/email-confirmation/events';
export * from './pods/invitation/events';
export * from './pods/user';

export const entities = [Configuration, Organization, User, Invitation, EmailConfirmation, File];

export const modules = [
    AuthModule,
    AdminModule,
    ConfigurationModule,
    FileModule,
    OrganizationModule,
    UserModule,
    EmailConfirmationModule,
    InvitationModule
];

export const providers = [{ provide: APP_PIPE, useClass: ValidationPipe }];
