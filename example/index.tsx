import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DockManager, useDockManager } from './..';
import { RenderFormEvent, RenderPanelEvent } from '../dist/components/hooks';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CloseIcon from '@mui/icons-material/Close';
import './index.css';

const App = () => {

  const isInit = React.useRef(false);
  const manager = useDockManager();

  React.useEffect(() => {
    if (!isInit.current) {
      const form1 = manager.createForm('Properties');
      const form2 = manager.createForm('Class View');
      const form3 = manager.createForm('Document');

      const panel1 = manager.createPanel([form1, form2]);
      const panel2 = manager.createPanel([form3]);

      const splitter = manager.createSplitter(panel1, panel2);

      manager.setLayout(splitter);

      isInit.current = false;
    }
  }, []);

  const onRenderPanel = (e: RenderPanelEvent) => {
    const activeForm = e.panel.forms[e.panel.activeForm];
    switch (activeForm.name) {
      case 'Properties':
        e.content = <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
          width: `100%`,
        }}>
          <AssignmentIcon fontSize="small" />
          <div>Properties</div>
          <CloseIcon fontSize="small" style={{ marginLeft: 'auto', cursor: 'pointer' }} onClick={() => manager.remove(activeForm.id)} />
        </div>
        break;
      default:
        break;
    }
  }

  const onRenderTab = (e: RenderFormEvent) => {
    switch (e.form.name) {
      case 'Properties':
        e.content = <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyItems: 'flex-start'
        }}><AssignmentIcon fontSize="small" /> Properties</div>
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <DockManager manager={manager} onRenderForm={(e) => e.content = 'No Content'} onRenderPanel={onRenderPanel} onRenderTab={onRenderTab}/>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
