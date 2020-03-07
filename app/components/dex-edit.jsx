import Modal                                    from 'react-modal';
import slug                                     from 'slug';
import { useDispatch, useSelector }             from 'react-redux';
import { useEffect, useMemo, useRef, useState } from 'react';

import { AlertComponent }       from './alert';
import { FormWarningComponent } from './form-warning';
import { ReactGA }              from '../utils/analytics';
import { deleteDex, updateDex } from '../actions/dex';

const GAME_WARNING = 'Any capture info specific to your old game will be lost.';
const REGIONAL_WARNING = 'Any non-regional capture info will be lost.';
const URL_WARNING = 'The old URL to your dex will not function anymore.';

export function DexEditComponent ({ dex, isOpen, onRequestClose }) {
  const dispatch = useDispatch();

  const formRef = useRef(null);

  const games = useSelector(({ games }) => games);
  const gamesById = useSelector(({ gamesById }) => gamesById);
  const session = useSelector(({ session }) => session);

  const [error, setError] = useState(null);
  const [title, setTitle] = useState(dex.title);
  const [game, setGame] = useState(dex.game.id);
  const [regional, setRegional] = useState(dex.regional);
  const [shiny, setShiny] = useState(dex.shiny);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isConfirmingUpdate, setIsConfirmingUpdate] = useState(false);

  const reset = () => {
    setError(null);
    setTitle(dex.title);
    setGame(dex.game.id);
    setRegional(dex.regional);
    setShiny(dex.shiny);
    setIsConfirmingDelete(false);
    setIsConfirmingUpdate(false);
  };

  useEffect(() => {
    reset();
  }, [dex.id]);

  const showGameWarning = useMemo(() => {
    const differentFamily = gamesById[game].game_family.id !== dex.game.game_family.id;
    const lessNationalCount = gamesById[game].game_family.national_total < dex.game.game_family.national_total;

    return differentFamily && lessNationalCount;
  }, [dex.id, game, gamesById]);

  const showRegionalWarning = useMemo(() => regional && !dex.regional, [dex.id, regional]);
  const showUrlWarning = useMemo(() => slug(title || 'Living Dex', { lower: true }) !== dex.slug, [dex.id, title]);

  const handleRequestClose = (shouldReload) => {
    reset();
    onRequestClose(shouldReload);
  };

  const handleGameChange = (e) => {
    const newGame = e.target.value;

    if (!gamesById[newGame].game_family.regional_support) {
      setRegional(false);
    }

    if (!gamesById[newGame].game_family.national_support) {
      setRegional(true);
    }

    setGame(newGame);
  };

  const handleTitleChange = (e) => setTitle(e.target.value);

  const handleDeleteClick = async (e) => {
    e.preventDefault();

    if (!isConfirmingDelete) {
      setIsConfirmingDelete(true);
      return;
    }

    setError(null);

    try {
      await dispatch(deleteDex(dex.slug, session.username));
      ReactGA.event({ action: 'delete', category: 'Dex' });
      handleRequestClose(true);
    } catch (err) {
      setError(err.message);
      if (formRef.current) {
        formRef.current.scrollTop = 0;
      }
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    if (!isConfirmingUpdate && (showGameWarning || showRegionalWarning || showUrlWarning)) {
      setIsConfirmingUpdate(true);
      return;
    }

    const payload = {
      slug: dex.slug,
      username: session.username,
      payload: { title, shiny, game, regional }
    };

    setError(null);

    try {
      await dispatch(updateDex(payload));
      ReactGA.event({ action: 'update', category: 'Dex' });
      handleRequestClose(true);
    } catch (err) {
      setError(err.message);
      if (formRef.current) {
        formRef.current.scrollTop = 0;
      }
    }
  };

  if (!isOpen || !games) {
    return null;
  }

  return (
    <Modal
      className="modal"
      contentLabel="Edit Dex"
      isOpen={isOpen}
      onRequestClose={() => handleRequestClose(false)}
      overlayClassName="modal-overlay"
    >
      <div className="dex-delete-container">
        {isConfirmingDelete ?
          <div>
            Are you sure?&nbsp;
            <a className="link" onClick={handleDeleteClick}>Yes</a>&nbsp;
            <a className="link" onClick={() => setIsConfirmingDelete(false)}>No</a>
          </div> :
          <a className="link" onClick={handleDeleteClick}>
            <i className="fa fa-trash" />
          </a>
        }
      </div>
      <div className="form" ref={formRef}>
        <h1>Edit a Dex</h1>
        <form className="form-column" onSubmit={handleUpdateSubmit}>
          <AlertComponent message={error} type="error" />
          <div className="form-group">
            <div className="form-note">/u/{session.username}/{slug(title || 'Living Dex', { lower: true })}</div>
            <label htmlFor="dex_title">Title</label>
            <FormWarningComponent message={showUrlWarning && URL_WARNING} />
            <input
              className="form-control"
              id="dex_title"
              maxLength="300"
              name="dex_title"
              onChange={handleTitleChange}
              placeholder="Living Dex"
              required
              type="text"
              value={title}
            />
            <i className="fa fa-asterisk" />
          </div>
          <div className="form-group">
            <FormWarningComponent message={showGameWarning && GAME_WARNING} />
            <label htmlFor="game">Game</label>
            <select className="form-control" onChange={handleGameChange} value={game}>
              {games.map((game) => <option key={game.id} value={game.id}>{game.name}</option>)}
            </select>
            <i className="fa fa-chevron-down" />
          </div>
          <div className="form-group">
            <FormWarningComponent message={showRegionalWarning && REGIONAL_WARNING} />
            <label htmlFor="regional">Regionality</label>
            <div className={`radio ${gamesById[game].game_family.national_support ? '' : 'disabled'}`}>
              <label title={gamesById[game].game_family.national_support ? '' : 'National dex is not supported for this game at this time.'}>
                <input
                  checked={!regional}
                  disabled={!gamesById[game].game_family.national_support}
                  name="regional"
                  onChange={() => setRegional(false)}
                  type="radio"
                  value="national"
                />
                <span className="radio-custom"><span /></span>National
              </label>
            </div>
            <div className={`radio ${gamesById[game].game_family.regional_support ? '' : 'disabled'}`}>
              <label title={gamesById[game].game_family.regional_support ? '' : 'Regional dex is not supported for this game at this time.'}>
                <input
                  checked={regional}
                  disabled={!gamesById[game].game_family.regional_support}
                  name="regional"
                  onChange={() => setRegional(true)}
                  type="radio"
                  value="regional"
                />
                <span className="radio-custom"><span /></span>Regional
              </label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="type">Type</label>
            <div className="radio">
              <label>
                <input
                  checked={!shiny}
                  name="type"
                  onChange={() => setShiny(false)}
                  type="radio"
                />
                <span className="radio-custom"><span /></span>Normal
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  checked={shiny}
                  name="type"
                  onChange={() => setShiny(true)}
                  type="radio"
                />
                <span className="radio-custom"><span /></span>Shiny
              </label>
            </div>
          </div>
          <AlertComponent className="form-confirm" message={isConfirmingUpdate && 'Please review the warnings above and confirm your edit!'} type="error" />
          <button className="btn btn-blue form-confirm" type="submit">{isConfirmingUpdate ? 'Confirm' : ''} Edit <i className="fa fa-long-arrow-right" /></button>
        </form>
      </div>
      <p><a className="link" onClick={() => handleRequestClose(false)}>Go Back</a></p>
    </Modal>
  );
}
