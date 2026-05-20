import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  ButtonA11yContract,
  ModalA11yContract,
  DrawerA11yContract,
  DropdownA11yContract,
  InputA11yContract,
  CheckboxA11yContract,
  RadioA11yContract,
  SelectA11yContract,
  SidebarA11yContract,
  ListA11yContract,
  TableA11yContract,
  BannerA11yContract,
  ToastA11yContract,
  PageA11yContract,
} from '../../a11y';

const meta: Meta = {
  title: 'A11y/AriaContracts',
};

export default meta;

type Story = StoryObj;

const ALL_CONTRACTS = [
  { component: 'Button', contract: ButtonA11yContract },
  { component: 'Modal', contract: ModalA11yContract },
  { component: 'Drawer', contract: DrawerA11yContract },
  { component: 'Dropdown', contract: DropdownA11yContract },
  { component: 'Input', contract: InputA11yContract },
  { component: 'Checkbox', contract: CheckboxA11yContract },
  { component: 'Radio', contract: RadioA11yContract },
  { component: 'Select', contract: SelectA11yContract },
  { component: 'Sidebar', contract: SidebarA11yContract },
  { component: 'List', contract: ListA11yContract },
  { component: 'Table', contract: TableA11yContract },
  { component: 'Banner', contract: BannerA11yContract },
  { component: 'Toast', contract: ToastA11yContract },
  { component: 'Page', contract: PageA11yContract },
];

export const ContractTable: Story = {
  name: 'Contract Reference Table',
  render: () => (
    <div style={{ padding: '24px', fontFamily: 'monospace' }}>
      <h2 style={{ marginBottom: '16px', fontFamily: 'sans-serif' }}>ARIA Contract Reference</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '13px' }}>
        <thead>
          <tr style={{ background: '#f0f0f0' }}>
            <th style={thStyle}>Component</th>
            <th style={thStyle}>Role</th>
            <th style={thStyle}>Key Attributes (semantic descriptors)</th>
          </tr>
        </thead>
        <tbody>
          {ALL_CONTRACTS.map(({ component, contract }) => (
            <tr key={component} style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={tdStyle}>{component}</td>
              <td style={{ ...tdStyle, color: '#0066cc' }}>{contract.role}</td>
              <td style={tdStyle}>
                {Object.keys(contract.attributes).length === 0
                  ? <span style={{ color: '#999' }}>—</span>
                  : Object.entries(contract.attributes).map(([k, v]) => (
                    <span key={k} style={{ display: 'block' }}>
                      <span style={{ color: '#d63031' }}>{k}</span>
                      {': '}
                      <span style={{ color: '#6c5ce7' }}>"{v}"</span>
                    </span>
                  ))
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '10px 12px',
  borderBottom: '2px solid #ccc',
  fontFamily: 'sans-serif',
  fontSize: '12px',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

const tdStyle: React.CSSProperties = {
  padding: '10px 12px',
  verticalAlign: 'top',
};
