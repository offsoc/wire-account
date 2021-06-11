/*
 * Wire
 * Copyright (C) 2019 Wire Swiss GmbH
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see http://www.gnu.org/licenses/.
 *
 */

import {APIClient} from '@wireapp/api-client';
import React, {HTMLProps} from 'react';
import * as Environment from 'script/Environment';

import {AccountAction} from './AccountAction';

interface ActionProviderProps extends HTMLProps<HTMLElement> {
  contextData?: typeof actionRoot;
}

const actionRoot: {
  accountAction: AccountAction;
} = {
  accountAction: new AccountAction(
    new APIClient({
      platform: 'account-pages',
      urls: {name: 'backend', rest: Environment.HOST_HTTP, ws: undefined},
      version: Environment.VERSION,
    }),
  ),
};

const ActionContext = React.createContext(actionRoot);

const ActionProvider = ({children, contextData}: ActionProviderProps) => (
  <ActionContext.Provider value={contextData || actionRoot}>{children}</ActionContext.Provider>
);

export {actionRoot, ActionContext, ActionProvider};
