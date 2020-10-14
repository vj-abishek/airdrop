import React, { useEffect, useRef } from 'react';
import autosize from 'autosize';

// class Textarea extends Component {
//   componentDidMount() {
//     this.textarea.focus();
//     autosize(this.textarea);
//   }

//   render() {
//     const style = {
//       maxHeight: '90px',
//       minHeight: '18px',
//       resize: 'none',
//       padding: '9px',
//       boxSizing: 'border-box',
//       fontSize: '15px',
//     };
//     return (
//       <>
//         <textarea
//           style={style}
//           ref={(c) => (this.textarea = c)}
//           placeholder="Message"
//           rows={1}
//           spellCheck="false"
//           {...this.props}
//         />
//       </>
//     );
//   }
// }

const Textarea = (props) => {
  const TextareaRef = useRef(null);

  useEffect(() => {
    autosize(TextareaRef.current);
  }, []);

  return (
    <>
      <textarea
        style={{
          maxHeight: '90px',
          minHeight: '18px',
          resize: 'none',
          padding: '9px',
          boxSizing: 'border-box',
          fontSize: '15px',
        }}
        ref={TextareaRef}
        placeholder="Message"
        rows={1}
        spellCheck="false"
        {...props}
      />
    </>
  );
};

export default Textarea;
