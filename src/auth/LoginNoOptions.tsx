import React, { useCallback, useEffect, useState } from 'react';
import { Button, DisplayText, Form, FormLayout, Icon, Stack, TextField } from '@shopify/polaris';
import { LinkMinor } from '@shopify/polaris-icons';
import _ from 'lodash';

type Props = {
  onLogin: (domain: string) => void;
};

const LoginNoOptions: React.FC<Props> = ({ onLogin }) => {
  const [shopDomain, setShopDomain] = useState('');
  const [error, setError] = useState<string | undefined>();

  const handleChange = useCallback((val) => {
    if (!_.isString(val) || val === '') {
      setShopDomain('');
    } else {
      setShopDomain(val.replace(/^http(s)?:\/\//g, '').replace(/\/.*$/g, ''));
    }
  }, []);

  const handleSubmit = useCallback(() => {
    if (!_.isString(shopDomain) || shopDomain === '') {
      setError('Shop domain is missing');
      return;
    }
    onLogin(shopDomain);
  }, [shopDomain, onLogin]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (error) {
        setError(undefined);
      }
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  return (
    <Form onSubmit={handleSubmit}>
      <FormLayout>
        <Stack distribution="center">
          <DisplayText>Enter your shop domain:</DisplayText>
        </Stack>
        <TextField
          id="ShopDomainTextField"
          label="Shop Domain"
          labelHidden
          type="text"
          inputMode="url"
          autoComplete="url"
          prefix={<Icon source={LinkMinor} />}
          placeholder="shopisea.myshopify.com"
          value={shopDomain}
          error={error}
          onChange={handleChange}
          monospaced
          focused
          helpText=""
        />
        <Stack distribution="center">
          <Button primary submit>
            Login
          </Button>
        </Stack>
      </FormLayout>
    </Form>
  );
};

export default LoginNoOptions;
